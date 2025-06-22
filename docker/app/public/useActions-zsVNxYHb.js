import{u as p,a7 as k,ap as h,ck as j,ac as x,av as y,j as i,aw as t,ax as s,ai as f,fV as C,az as A,aB as a,aC as o,aP as _,aQ as b,aR as D,bc as E,b_ as I}from"./bundle.D3-hVUGj.js";import{b as g,A as d}from"./transactions-09IVy-b-.js";/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */function w(){return n=>n.includes("\\n ")?n.replace("\\n",""):n.includes("\\n")?n.replace("\\n"," "):n}function R(){const[n]=p(),c=g(),u=k(),{isEditPage:l}=h({entity:"transaction"}),{data:r}=j(),v=x(y),m=e=>{r&&(v(E.cloneDeep({...r,line_items:[{...I(),notes:e.description,cost:e.amount,product_key:e.date,quantity:1}]})),u("/invoices/create?action=invoice_transaction"))};return[e=>e.base_type===d.Credit&&i.jsx(t,{onClick:()=>m(e),icon:i.jsx(s,{element:f}),children:n("create_invoice")}),e=>e.payment_id&&i.jsx(t,{onClick:()=>c([e.id],"unlink"),icon:i.jsx(s,{element:C}),children:n("unlink")}),e=>!!((e.payment_id||e.base_type===d.Credit)&&l)&&i.jsx(A,{withoutPadding:!0}),e=>a(e)===o.Active&&l&&i.jsx(t,{onClick:()=>c([e.id],"archive"),icon:i.jsx(s,{element:_}),children:n("archive")}),e=>(a(e)===o.Archived||a(e)===o.Deleted)&&l&&i.jsx(t,{onClick:()=>c([e.id],"restore"),icon:i.jsx(s,{element:b}),children:n("restore")}),e=>(a(e)===o.Active||a(e)===o.Archived)&&l&&i.jsx(t,{onClick:()=>c([e.id],"delete"),icon:i.jsx(s,{element:D}),children:n("delete")})]}export{R as a,w as u};
