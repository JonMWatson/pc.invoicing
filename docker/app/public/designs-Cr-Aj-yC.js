import{ao as r,b as n,r as s,e as t,i as u,cx as d,cy as l}from"./bundle.D3-hVUGj.js";/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */function c(){return["Plain","Clean","Bold","Modern"]}/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */function f(){const e=c();return n(["/api/v1/designs"],()=>s("GET",t("/api/v1/designs?status=active&sort=name|asc&per_page=100")).then(a=>a.data.data.filter(i=>e.includes(i.name)||d()||l())),{staleTime:1/0})}function m(e){return n(["/api/v1/designs",e.id],()=>s("GET",t("/api/v1/designs/:id?include=client",{id:e.id})).then(a=>a.data.data),{staleTime:1/0,...e})}function p(e){const{isAdmin:a}=r();return n(u("/api/v1/designs/create"),()=>s("GET",t("/api/v1/designs/create")).then(i=>i.data.data),{...e,staleTime:1/0,enabled:a?(e==null?void 0:e.enabled)??!0:!1})}function v(e){return n(["/api/v1/designs","?template=true&entities=",e],()=>s("GET",t("/api/v1/designs?template=true&status=active&sort=name|asc&entities="+e)).then(a=>a.data.data),{staleTime:1/0})}export{c as a,f as b,v as c,m as d,p as u};
