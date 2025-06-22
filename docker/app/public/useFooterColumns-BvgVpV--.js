import{u as r}from"./useSumTableColumn-CIYkE3cT.js";import{u as a,w as c,dm as i}from"./bundle.D3-hVUGj.js";/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */function b(){var s;const[t]=a(),o=c(),e=r();i();const u=[{column:"amount",id:"amount",label:t("amount"),format:(n,m)=>e(n,m)}],l=((s=o==null?void 0:o.table_footer_columns)==null?void 0:s.recurringInvoice)||[];return{footerColumns:u.filter(({id:n})=>l.includes(n)),allFooterColumns:u}}export{b as u};
