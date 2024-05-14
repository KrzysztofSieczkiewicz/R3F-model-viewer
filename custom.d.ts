declare module '*.module.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
  }

declare module '*.svg' {  
    import React = require('react');

    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module '*.png' {
    const value: string;
    export = value;
   }