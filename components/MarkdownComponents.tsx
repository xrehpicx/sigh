import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";

export const MarkdownComponents: Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
> = {
  h1: (props) => (
    <h1 className="inline-block text-3xl sm:text-3xl font-extrabold text-background-900 tracking-tight dark:text-slate-200">
      {props.children}
    </h1>
  ),
  h2: (props) => (
    <h2 className="mt-1 text-3xl whitespace-pre-wrap tracking-tight font-bold text-background-900 dark:text-slate-200">
      {props.children}
    </h2>
  ),
  h3: (props) => (
    <h3 className="mt-1 text-2xl whitespace-pre-wrap font-semibold text-background-900 dark:text-slate-200">
      {props.children}
    </h3>
  ),
  p: (props) => (
    <p className="mt-2 text-lg text-background-900 dark:text-background-100">
      {props.children}
    </p>
  ),
  li: (props) => (
    <li className="list-disc ml-4">
      <p className="mt-2 text-lg text-background-900 dark:text-background-100">
        {props.children}
      </p>
    </li>
  ),
};