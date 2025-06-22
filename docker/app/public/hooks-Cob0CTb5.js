import{bo as t,u as i,K as c,eM as m,l,ac as u,bn as T,p as f}from"./bundle.D3-hVUGj.js";/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */const b=t(void 0),k=t(void 0),d=t(!1);t(!1);/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */function A(a){const e=u(b),o=u(d),{data:s}=T({id:a,enabled:!!a});f.useEffect(()=>{s&&(e(s),o(!0))},[s])}function Y(){const{t:a}=i(),e=c({formatOnlyTime:!0});return o=>{const s=[];return m(o).map(([n,r])=>{s.push([l(n,"YYYY-MM-DD"),e(n),r===0?a("now"):e(r)])}),s}}export{k as a,A as b,b as c,d as i,Y as u};
