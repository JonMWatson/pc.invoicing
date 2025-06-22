import{d,w as m,z as i}from"./bundle.D3-hVUGj.js";/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */function g(p){const s=d(),n=m(),{currencyPath:y,countryPath:a}={};return(o,t)=>{if(o&&t){const u=o.reduce((c,l)=>c=c+l,0),r=i(t).pluck(a||"client.country_id").unique().toArray(),e=i(t).pluck(y||"client.settings.currency_id").unique().toArray();return r.length>1||e.length>1?u:s(u,typeof r[0]=="string"?r[0]:void 0,typeof e[0]=="string"?e[0]:void 0,(n==null?void 0:n.number_precision)||2)}return"-/-"}}export{g as u};
