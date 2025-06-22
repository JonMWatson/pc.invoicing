import{dO as h,u as d,j as t,bu as o,G as x,cu as i,dj as g}from"./bundle.D3-hVUGj.js";/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */function y(e,u,n){if(e==null||u==null)return 1;const r=n==null?void 0:n.currencies.find(c=>c.id===e),a=n==null?void 0:n.currencies.find(c=>c.id===u),l=n==null?void 0:n.currencies.find(c=>c.id==="1");return r==l?a.exchange_rate:a==l?1/((r==null?void 0:r.exchange_rate)??1):a.exchange_rate*(1/r.exchange_rate)}function m(e){const{data:u}=h(),[n]=d(),r=a=>e.onChange(y(e.currencyId,a,u),a);return t.jsxs(t.Fragment,{children:[t.jsx(o,{leftSide:n("currency"),children:t.jsx(x,{value:e.exchangeCurrencyId,onChange:r,dismissable:!0})}),t.jsx(o,{leftSide:n("exchange_rate"),children:t.jsx(i,{value:e.exchangeRate||"",onValueChange:a=>e.onExchangeRateChange(parseFloat(a)),disablePrecision:!0})}),t.jsx(o,{leftSide:n("converted_amount"),children:t.jsx(i,{value:e.amount*parseFloat(e.exchangeRate)||"",onValueChange:a=>e.onExchangeRateChange(parseFloat(a)/e.amount),disablePrecision:!0})})]})}/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */function j(){const[e]=d();let u={};return u=Object.entries(g).reduce((r,[a,l])=>(r[a]=e(l),r),{}),Object.entries(u).sort((r,a)=>r[1].localeCompare(a[1]))}export{m as C,j as u};
