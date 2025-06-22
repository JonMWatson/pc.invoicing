import{Y as c,b as s,r as a,e as n,i as d,bq as y,bI as o,bJ as p,bd as u,$ as m}from"./bundle.D3-hVUGj.js";/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */function b(e){return s(["/api/v1/payments",e],()=>a("GET",n("/api/v1/payments/:id?include=client,invoices,paymentables,:include",{id:e.id,include:e.include||""})).then(t=>t.data.data),{enabled:e.enabled??!0,staleTime:1/0})}function v(e){return s(["/api/v1/payments",e],()=>a("GET",n("/api/v1/payments?filter=:filter&per_page=:per_page&status=:status&page=:page&match_transactions=:match_transactions&include=:include",{per_page:e.perPage??"100",page:e.currentPage??"1",status:e.status??"active",filter:e.filter??"",match_transactions:e.matchTransactions??!1,include:e.include||""})).then(t=>t.data.data),{enabled:e.enabled??!0,staleTime:1/0})}function g(){const e=c();return s(d("/api/v1/payments/create"),()=>a("GET",n("/api/v1/payments/create")),{staleTime:1/0,enabled:e("create_payment")})}function h(){const e=y(),t=o(p);return(r,i)=>{u.processing(),a("POST",n("/api/v1/payments/bulk"),{action:i,ids:r}).then(()=>{const l=i==="email"?"emaile":i;u.success(`${l}d_payment`),t&&e.invalidateQueries([t]),m(["payments"])})}}export{h as a,b,v as c,g as u};
