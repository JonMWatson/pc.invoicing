import{bq as o,bd as n,r as u,e as a}from"./bundle.D3-hVUGj.js";/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */function r({entity:e}){const t=o();return s=>{s.length&&(n.processing(),t.fetchQuery([`/api/v1/${e}s/bulk`],()=>u("POST",a(`/api/v1/${e}s/bulk`),{action:"bulk_download",ids:s}).then(()=>n.success("downloaded_entities"))))}}export{r as u};
