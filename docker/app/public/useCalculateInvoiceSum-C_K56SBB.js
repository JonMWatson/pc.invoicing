import{cG as r,bZ as u,t,b$ as i,c0 as v}from"./bundle.D3-hVUGj.js";/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */function a(){const s=r(),o=u(),n=t();return async e=>{const c=await s.find(e);return o(c.currency_id||n.settings.currency_id)}}/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */function m(s){const o=a();return async n=>{const e=await o(n.vendor_id),c=n.uses_inclusive_taxes?new i(n,e).build():new v(n,e).build();return s(c),c.invoice}}export{m as u};
