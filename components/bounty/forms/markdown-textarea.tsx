"use client"

import * as React from "react"
import Markdown from "react-markdown"
import { Textarea } from "@/components/ui/textarea"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type UseFormReturn, type FieldValues } from "react-hook-form"

interface MarkdownTextareaProps {
  form: UseFormReturn<FieldValues>
  name: string
  label?: string
  description?: string
  placeholder?: string
  maxLength?: number
}

const DEFAULT_MAX_LENGTH = 10000

export function MarkdownTextarea({
  form,
  name,
  label,
  description,
  placeholder,
  maxLength = DEFAULT_MAX_LENGTH,
}: MarkdownTextareaProps) {
  const value = form.watch(name) || ""

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Tabs defaultValue="write" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="write" className="mt-2">
              <FormControl>
                <Textarea
                  placeholder={placeholder}
                  className="min-h-[200px] resize-y"
                  maxLength={maxLength}
                  {...field}
                />
              </FormControl>
              <div className="mt-1 flex justify-between">
                <FormDescription>{description}</FormDescription>
                <span className="text-muted-foreground text-sm">
                  {value.length} / {maxLength}
                </span>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="mt-2">
              <div className="border-input bg-background min-h-[200px] rounded-md border px-3 py-2">
                {value ? (
                  <div className="prose prose-sm prose-invert max-w-none prose-headings:text-gray-100 prose-p:text-gray-400 prose-li:text-gray-400 prose-strong:text-gray-200 prose-code:text-primary prose-code:rounded prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5">
                    <Markdown>{value}</Markdown>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Nothing to preview</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
