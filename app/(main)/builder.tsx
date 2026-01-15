"use client"

import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  Chip,
  Image,
  Input,
  Tooltip,
} from "@nextui-org/react"
import copy from "copy-to-clipboard"
import { useState, useMemo, useRef } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import IframePage from "@/app/(empty)/iframe/page"

const options = [
  {
    name: "cols",
    type: "number",
    default: "12",
    desc: "每行头像个数（默认：12）",
  },
  {
    name: "pages",
    type: "number",
    default: "1",
    desc: "每个仓库生成的页数（默认：1），每页100个贡献者",
  },
  {
    name: "radius",
    type: "number",
    default: "32",
    desc: "头像半径（默认：32）",
  },
  {
    name: "space",
    type: "number",
    default: "5",
    desc: "头像间距（默认：5）",
  },
  {
    name: "min_contributions",
    type: "number",
    default: "0",
    desc: "只显示最少贡献次数（默认：0）",
  },
  {
    name: "compress",
    type: "number",
    default: "",
    desc: "压缩后的头像高度/宽度（默认：radius * 4，设为0禁用压缩）",
  },
  {
    name: "no_bot",
    type: "boolean",
    default: false,
    desc: "不显示机器人账户（默认：false）",
  },
]

export function Builder() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const repos = searchParams.getAll("repo")
  function setRepos(_repos: string[]) {
    const params = new URLSearchParams()
    searchParams.forEach((value, key) => {
      if (key !== "repo") {
        params.append(key, value)
      }
    })
    _repos.forEach((repo) => params.append("repo", repo))
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }
  const svg = useMemo(() => {
    const params = [] as string[]
    searchParams.forEach((value, key) => {
      params.push(`${key}=${value}`)
    })
    return `${location.origin}/api?` + params.join("&")
  }, [repos])
  const inputRef = useRef<HTMLInputElement>(null)
  const [copied, setCopied] = useState(false)
  function add() {
    const text = inputRef.current?.value
    if (!text || repos.includes(text)) return
    inputRef.current!.value = ""
    setRepos([...repos, text])
  }
  function setOption(key: string, value?: string) {
    const params = new URLSearchParams()
    searchParams.forEach((value, key) => {
      params.append(key, value)
    })
    if (!value) {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }
  const inputDom = (
    <>
      <Input
        ref={inputRef}
        placeholder="输入 GitHub 仓库地址，格式为 owner/repo"
        // variant="faded"
        // color="primary"
        className="w-full font-mono"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            add()
          }
        }}
        endContent={
          <Button
            size="sm"
            color="primary"
            onPress={() => {
              add()
            }}
          >
            添加
          </Button>
        }
      />
      <div className="flex gap-2 flex-wrap items-center font-mono">
        {repos.map((repo) => (
          <Chip
            key={repo}
            onClose={() => {
              setRepos(repos.filter((r) => r !== repo))
            }}
            radius="sm"
          >
            {repo}
          </Chip>
        ))}
      </div>
      <Accordion>
        <AccordionItem
          title="高级选项"
          classNames={{
            trigger: "py-0",
          }}
        >
          <div className="flex gap-2 flex-wrap items-center font-mono w-full">
            {options.map((option) => {
              if (["number", "string"].includes(option.type)) {
                return (
                  <Input
                    key={option.name}
                    label={option.name}
                    placeholder={option.desc}
                    value={searchParams.get(option.name) || ""}
                    onChange={(e) => {
                      const value = e.target.value.trim()
                      setOption(
                        option.name,
                        !value || value === option.default ? undefined : value
                      )
                    }}
                    size="sm"
                  />
                )
              } else if (option.type === "boolean") {
                return (
                  <Tooltip content={option.desc} key={option.name}>
                    <Button
                      size="sm"
                      color={
                        searchParams.get(option.name) === "true"
                          ? "primary"
                          : "default"
                      }
                      onPress={() => {
                        setOption(
                          option.name,
                          searchParams.get(option.name) === "true"
                            ? undefined
                            : "true"
                        )
                      }}
                    >
                      {option.name}
                    </Button>
                  </Tooltip>
                )
              }
            })}
          </div>
        </AccordionItem>
      </Accordion>
    </>
  )
  return (
    <div className="w-full pt-4 md:px-10 lg:px-[14%] flex gap-2 flex-col">
      <Card className="hidden sm:flex">
        <CardBody className="flex flex-col gap-3">{inputDom}</CardBody>
      </Card>
      <div className="flex sm:hidden flex-col gap-3">{inputDom}</div>
      {repos.length > 0 && (
        <>
          <div className="flex justify-center">
            <IframePage />
          </div>
          <Card>
            <CardBody>
              <div className="flex font-mono justify-between items-center break-all">
                <p>{svg}</p>
                <Button
                  onClick={() => {
                    copy(svg)
                    setCopied(true)
                    setTimeout(() => {
                      setCopied(false)
                    }, 1000)
                  }}
                  size="sm"
                  color="primary"
                >
                  {copied ? "已复制！" : "复制"}
                </Button>
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  )
}
