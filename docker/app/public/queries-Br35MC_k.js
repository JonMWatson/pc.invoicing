import{Y as n,b as t,r,e as i}from"./bundle.D3-hVUGj.js";/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */function u(e){const a=n();return t(["/api/v1/credits","create"],()=>r("GET",i("/api/v1/credits/create")).then(s=>s.data.data),{...e,staleTime:1/0,enabled:a("create_credit")?(e==null?void 0:e.enabled)??!0:!1})}function c({id:e}){return t(["/api/v1/credits",e],()=>r("GET",i("/api/v1/credits/:id?include=client",{id:e})).then(a=>a.data.data),{staleTime:1/0})}export{c as a,u};
