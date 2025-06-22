import{b as t,Y as n,r as u,e as s}from"./bundle.D3-hVUGj.js";/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */function c(e){const a=n();return t(["/api/v1/quotes","create"],()=>u("GET",s("/api/v1/quotes/create")).then(r=>r.data.data),{...e,staleTime:1/0,enabled:a("create_quote")?(e==null?void 0:e.enabled)??!0:!1})}function d({id:e}){return t(["/api/v1/quotes",e],()=>u("GET",s("/api/v1/quotes/:id?include=client",{id:e})).then(a=>a.data.data),{staleTime:1/0})}export{c as a,d as u};
