import{u as v,bE as f,j as e,B as t}from"./bundle.D3-hVUGj.js";/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */var n=(r=>(r.Viewed="-1",r.Draft="1",r.Sent="2",r.Partial="3",r.Applied="4",r))(n||{});function j(r){const[i]=v(),{status_id:a,is_deleted:d,archived_at:l,invitations:o}=r.entity,s=f(),c=()=>o.some(h=>h.viewed_date),u=!(a===n.Applied),p=c();return d?e.jsx(t,{variant:"red",children:i("deleted")}):l?e.jsx(t,{variant:"orange",children:i("archived")}):p&&u?e.jsx(t,{variant:"light-blue",children:i("viewed")}):a===n.Draft?e.jsx(t,{variant:"generic",children:i("draft")}):a===n.Sent?e.jsx(t,{variant:"light-blue",style:{backgroundColor:s.$1},children:i("sent")}):a===n.Partial?e.jsx(t,{variant:"dark-blue",style:{backgroundColor:s.$2},children:i("partial")}):a===n.Applied?e.jsx(t,{variant:"green",style:{backgroundColor:s.$3},children:i("applied")}):e.jsx(e.Fragment,{})}export{n as C,j as a};
