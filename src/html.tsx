import React from 'react'

import {ThemeMode} from './const'

interface Props {
  htmlAttributes: React.HtmlHTMLAttributes<HTMLHtmlElement>
  headComponents: JSX.Element[]
  bodyAttributes: React.HTMLAttributes<HTMLBodyElement>
  preBodyComponents: JSX.Element[]
  body: string
  postBodyComponents: JSX.Element[]
}

export default function HTML(props: Props): JSX.Element {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes} className='light'>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                window.__onThemeChange = function() {};

                function setTheme(newTheme) {
                  window.__theme = newTheme;
                  preferredTheme = newTheme;
                  document.body.className = newTheme;
                  window.__onThemeChange(newTheme);
                }

                let preferredTheme;
                try {
                  preferredTheme = localStorage.getItem('theme');
                } catch (err) { }

                window.__setPreferredTheme = function(newTheme) {
                  setTheme(newTheme);
                  try {
                    localStorage.setItem('theme', newTheme);
                  } catch (err) {}
                }

                let darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
                darkQuery.addListener(function(e) {
                  window.__setPreferredTheme(e.matches ? '${ThemeMode.Dark}' : '${ThemeMode.Light}');
                });

                setTheme(preferredTheme || (darkQuery.matches ? '${ThemeMode.Dark}' : '${ThemeMode.Light}'));
              })();
            `,
          }}
        />
        {props.preBodyComponents}
        <div
          key={`body`}
          id='___gatsby'
          dangerouslySetInnerHTML={{__html: props.body}}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}
