import{_ as R,r as w,j as E,y as G,b as O,c as l,a,m as A,d as n,t as I,w as i,e as v,F as D,f as F,i as J,k as K,u as $,o as r,h as S,p as B,v as p}from"./index-kcQoswnZ.js";import{D as P}from"./DiscoveryCard-DAYZeJFw.js";const z={class:"article-discovery"},H={class:"upload-section"},T={key:0,class:"search-result-header"},W={class:"search-info"},Q={class:"search-keyword"},X={class:"result-count"},Y={key:1,class:"content-feed"},Z={key:2,class:"no-results"},ee={class:"no-results-content"},te={key:3,class:"content-feed"},oe={key:0},ae={__name:"ArticleDiscovery",setup(se){const _=$(),y=K(),h=w(!1),t=w({title:"",content:"",coverFileList:[]}),c=w([{id:1,title:"Vue3 项目开发经验分享",author:"小明",authorAvatar:"/src/assets/images/avatar1.webp",coverImage:"/src/assets/images/HomePage.png",content:`在开发PathMate项目的过程中，我积累了一些Vue3开发的经验，想和大家分享一下。

首先，关于组件设计。我发现使用Composition API可以让代码更加清晰和可维护。特别是对于复杂的业务逻辑，使用setup语法糖可以让代码结构更加直观。

其次，关于状态管理。对于简单的状态，使用ref和reactive就足够了。但是对于跨组件的状态共享，建议使用Pinia或者Vuex。

最后，关于性能优化。使用v-memo和v-once可以有效地减少不必要的渲染。同时，合理使用computed和watch可以避免不必要的计算。

希望这些经验对大家有帮助！`,createdAt:Date.now()-864e5*2,likeCount:15,isLiked:!1,comments:[{id:1,user:"小红",content:"非常实用的经验分享，学到了很多！",createdAt:Date.now()-36e5},{id:2,user:"小李",content:"关于性能优化的部分特别有用，感谢分享！",createdAt:Date.now()-72e5}]},{id:2,title:"前端路由设计最佳实践",author:"小张",authorAvatar:"/src/assets/images/avatar2.webp",coverImage:"/src/assets/images/BackGround.webp",content:`在PathMate项目中，我负责了路由系统的设计。这里分享一些最佳实践。

1. 路由懒加载
使用动态import可以实现路由的懒加载，这样可以减少初始加载时间。

2. 路由守卫
合理使用beforeEach、beforeResolve等路由守卫可以实现权限控制和数据预加载。

3. 嵌套路由
对于复杂的页面结构，使用嵌套路由可以让代码组织更加清晰。

4. 路由元信息
使用meta字段可以存储路由相关的元信息，比如页面标题、权限要求等。

这些实践在我们的项目中都得到了很好的应用。`,createdAt:Date.now()-864e5*5,likeCount:23,isLiked:!1,comments:[{id:1,user:"小王",content:"路由守卫的使用确实很重要，学到了！",createdAt:Date.now()-18e5}]},{id:3,title:"团队协作开发经验",author:"小刘",authorAvatar:"/src/assets/images/avatar3.jpg",coverImage:"/src/assets/images/help.jpg",content:`在PathMate团队中，我们采用了一些协作开发的最佳实践，效果很好。

1. Git工作流
我们使用Git Flow工作流，每个功能都在独立的分支上开发，通过Pull Request进行代码审查。

2. 代码规范
使用ESLint和Prettier统一代码风格，确保代码质量。

3. 组件文档
为每个组件编写文档，包括使用示例和API说明。

4. 定期沟通
每周举行站会，及时同步进度和问题。

这些实践让我们的团队协作更加高效。`,createdAt:Date.now()-864e5*7,likeCount:8,isLiked:!1,comments:[]}]),M=s=>s.type.startsWith("image/")?(s.size/1024/1024<2||p.error("图片大小不能超过 2MB!"),!1):(p.error("只能上传图片文件!"),!1),U=()=>{if(!t.value.title.trim()){p.warning("请输入标题");return}if(!t.value.content.trim()){p.warning("请输入文章内容");return}const s={id:Date.now(),title:t.value.title,author:"当前用户",authorAvatar:null,coverImage:t.value.coverFileList[0]?.thumbUrl||null,content:t.value.content};c.value.unshift(s),p.success("发布成功!"),k(),h.value=!1,L()},k=()=>{t.value={title:"",content:"",coverFileList:[]}},u=w(""),x=()=>{u.value=y.query.search||""},f=E(()=>{if(!u.value)return c.value;const s=u.value.toLowerCase().trim();return c.value.filter(e=>e.title.toLowerCase().includes(s))}),b=()=>{_.push({name:"discovery-articles"}),u.value=""},C=s=>{_.push(`/discovery/articles/${s.id}`)},L=()=>{localStorage.setItem("discovery-article-items",JSON.stringify(c.value))};return G(()=>y.query.search,()=>{x()},{immediate:!0}),O(()=>{const s=localStorage.getItem("discovery-article-items");if(s)try{const e=JSON.parse(s),m=new Set(e.map(d=>d.id)),g=c.value.filter(d=>!m.has(d.id));c.value=[...g,...e]}catch(e){console.error("Failed to load article items:",e)}L(),x()}),(s,e)=>{const m=v("a-button"),g=v("a-input"),d=v("a-form-item"),V=v("a-upload"),N=v("a-textarea"),j=v("a-form"),q=v("a-modal");return r(),l("div",z,[a("div",H,[a("button",{class:"upload-btn",onClick:e[0]||(e[0]=o=>h.value=!0)},[...e[5]||(e[5]=[a("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[a("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),a("line",{x1:"5",y1:"12",x2:"19",y2:"12"})],-1),a("span",null,"发布经验文章",-1)])])]),u.value?(r(),l("div",T,[a("div",W,[a("span",Q,'搜索关键词: "'+I(u.value)+'"',1),a("span",X,"找到 "+I(f.value.length)+" 篇文章",1)]),n(m,{type:"link",onClick:b},{default:i(()=>[...e[6]||(e[6]=[S("清除搜索",-1)])]),_:1})])):A("",!0),f.value.length>0?(r(),l("div",Y,[(r(!0),l(D,null,F(f.value,o=>(r(),B(P,{key:o.id,item:o,onClick:C},null,8,["item"]))),128))])):u.value?(r(),l("div",Z,[a("div",ee,[e[8]||(e[8]=J('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-0b330b49><circle cx="11" cy="11" r="8" data-v-0b330b49></circle><line x1="21" y1="21" x2="16.65" y2="16.65" data-v-0b330b49></line></svg><p class="no-results-text" data-v-0b330b49>未找到相关文章</p><p class="no-results-hint" data-v-0b330b49>尝试使用其他关键词搜索</p>',3)),n(m,{type:"primary",onClick:b},{default:i(()=>[...e[7]||(e[7]=[S("清除搜索",-1)])]),_:1})])])):(r(),l("div",te,[(r(!0),l(D,null,F(c.value,o=>(r(),B(P,{key:o.id,item:o,onClick:C},null,8,["item"]))),128))])),n(q,{open:h.value,"onUpdate:open":e[4]||(e[4]=o=>h.value=o),title:"发布新的经验文章",width:600,onOk:U,onCancel:k},{default:i(()=>[n(j,{model:t.value,"label-col":{span:6},"wrapper-col":{span:18}},{default:i(()=>[n(d,{label:"标题",required:""},{default:i(()=>[n(g,{value:t.value.title,"onUpdate:value":e[1]||(e[1]=o=>t.value.title=o),placeholder:"请输入文章标题",maxlength:50,"show-count":""},null,8,["value"])]),_:1}),n(d,{label:"封面图"},{default:i(()=>[n(V,{"file-list":t.value.coverFileList,"onUpdate:fileList":e[2]||(e[2]=o=>t.value.coverFileList=o),"list-type":"picture-card","before-upload":M},{default:i(()=>[t.value.coverFileList.length<1?(r(),l("div",oe,[...e[9]||(e[9]=[a("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[a("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),a("line",{x1:"5",y1:"12",x2:"19",y2:"12"})],-1),a("div",{style:{"margin-top":"8px"}},"上传封面",-1)])])):A("",!0)]),_:1},8,["file-list"])]),_:1}),n(d,{label:"文章内容",required:""},{default:i(()=>[n(N,{value:t.value.content,"onUpdate:value":e[3]||(e[3]=o=>t.value.content=o),placeholder:"请输入文章内容...",rows:8,maxlength:2e3,"show-count":""},null,8,["value"])]),_:1})]),_:1},8,["model"])]),_:1},8,["open"])])}}},le=R(ae,[["__scopeId","data-v-0b330b49"]]);export{le as default};
