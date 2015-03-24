/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control'],function(q,a,C){"use strict";var R=C.extend("sap.ui.commons.RowRepeater",{metadata:{library:"sap.ui.commons",properties:{numberOfRows:{type:"int",group:"Dimension",defaultValue:5},currentPage:{type:"int",group:"Data",defaultValue:1},showMoreSteps:{type:"int",group:"Behavior",defaultValue:0},fixedRowHeight:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:''},design:{type:"sap.ui.commons.RowRepeaterDesign",group:"Appearance",defaultValue:sap.ui.commons.RowRepeaterDesign.Standard},threshold:{type:"int",defaultValue:null}},defaultAggregation:"rows",aggregations:{rows:{type:"sap.ui.core.Control",multiple:true,singularName:"row",bindable:"bindable"},title:{type:"sap.ui.core.Title",multiple:false},filters:{type:"sap.ui.commons.RowRepeaterFilter",multiple:true,singularName:"filter"},sorters:{type:"sap.ui.commons.RowRepeaterSorter",multiple:true,singularName:"sorter"},noData:{type:"sap.ui.core.Control",multiple:false},filterToolbar:{type:"sap.ui.commons.Toolbar",multiple:false,visibility:"hidden"},sorterToolbar:{type:"sap.ui.commons.Toolbar",multiple:false,visibility:"hidden"},headerShowMoreButton:{type:"sap.ui.commons.Button",multiple:false,visibility:"hidden"},footerShowMoreButton:{type:"sap.ui.commons.Button",multiple:false,visibility:"hidden"},footerPager:{type:"sap.ui.commons.Paginator",multiple:false,visibility:"hidden"}},events:{filter:{parameters:{filterId:{type:"string"}}},sort:{parameters:{sorterId:{type:"string"}}},page:{parameters:{currentPage:{type:"int"},previousPage:{type:"int"}}},resize:{parameters:{numberOfRows:{type:"int"},previousNumberOfRows:{type:"int"}}}}}});R.prototype.bPagingMode=true;R.prototype.bShowAnimation=true;R.SHOW_MORE="show_more";R.RESIZE="resize";R.FIRST_PAGE="first_page";R.LAST_PAGE="last_page";R.PREVIOUS_PAGE="previous_page";R.NEXT_PAGE="next_page";R.GOTO_PAGE="goto_page";R.prototype.init=function(){var i=this.getId();this.oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");this.sCurrentAnimation=null;this.aAnimationQueue=[];this.aRemoveBuffer=[];this.iPreviousPage=this.getCurrentPage();this.iPreviousNumberOfRows=this.getNumberOfRows();this.setAggregation("filterToolbar",new sap.ui.commons.Toolbar(i+"-ftb",{standalone:false,design:sap.ui.commons.ToolbarDesign.Transparent}));this.setAggregation("sorterToolbar",new sap.ui.commons.Toolbar(i+"-stb",{standalone:false}));var p=new sap.ui.commons.Paginator(i+"-fp",{page:[this.paging,this]});this.setAggregation("footerPager",p);var s=this.oResourceBundle.getText("SHOW_MORE");this.setAggregation("headerShowMoreButton",new sap.ui.commons.Button(i+"-hsm",{text:s,press:[this.triggerShowMore,this]}));this.setAggregation("footerShowMoreButton",new sap.ui.commons.Button(i+"-fsm",{text:s,press:[this.triggerShowMore,this]}));this._bSecondPage=false};R.prototype.triggerShowMore=function(){if(this.getShowMoreSteps()<=0){return this}var s=this.getShowMoreSteps();var n=this.getNumberOfRows();var N=Math.min(this._getRowCount(),n+s);if(n===N){return this}if(this.getDomRef()&&this.bShowAnimation){if(this.sCurrentAnimation!==null){this.aAnimationQueue.push({name:R.SHOW_MORE,animationFunction:this.triggerShowMore,args:arguments});return this}else{this.sCurrentAnimation=R.SHOW_MORE}this.iPreviousNumberOfRows=n;this.setProperty("numberOfRows",N,true);this.startResizeAnimation()}else{this.setNumberOfRows(N)}this.fireResize({numberOfRows:N,previousNumberOfRows:n});return this};R.prototype.resize=function(n){if(this.getShowMoreSteps()<=0){return this}var N=this.getNumberOfRows();if(n<=0||n>this._getRowCount()||n===N){return this}if(this.getDomRef()&&this.bShowAnimation){if(this.sCurrentAnimation!==null){this.aAnimationQueue.push({name:R.RESIZE,animationFunction:this.resize,args:arguments});return this}else{this.sCurrentAnimation=R.RESIZE}this.iPreviousNumberOfRows=N;this.setProperty("numberOfRows",n,true);this.startResizeAnimation()}else{this.setNumberOfRows(n)}this.fireResize({numberOfRows:n,previousNumberOfRows:N});return this};R.prototype.applyFilter=function(i){var f=this.getFilters();var l=this.getBinding("rows");var F,n;if(f.length===0||l===null){return this}for(n=0;n<f.length;n++){if(f[n].getId()===i){F=f[n];break}}if(F){l.filter(F.getFilters(),sap.ui.model.FilterType.Control);this.fireFilter({filterId:i});this.firstPage()}return this};R.prototype.triggerSort=function(i){var s=this.getSorters();var l=this.getBinding("rows");var S,n;if(s.length===0||l===null){return this}for(n=0;n<s.length;n++){if(s[n].getId()===i){S=s[n];break}}if(S){l.sort(S.getSorter());this.fireSort({sorterId:i});this.firstPage()}return this};R.prototype.firstPage=function(){if(this.getShowMoreSteps()>0){return this}var c=this.getCurrentPage();if(c===1){return this}this.getAggregation("footerPager").setCurrentPage(1);if(this.getDomRef()&&this.bShowAnimation){if(this.sCurrentAnimation!==null){this.aAnimationQueue.push({name:R.FIRST_PAGE,animationFunction:this.firstPage,args:arguments});return this}else{this.sCurrentAnimation=R.FIRST_PAGE}this.iPreviousPage=c;this.setProperty("currentPage",1,true);this.startPagingAnimation()}else{this.setCurrentPage(1)}this.firePage({currentPage:1,previousPage:c});return this};R.prototype.lastPage=function(){if(this.getShowMoreSteps()>0){return this}var c=this.getCurrentPage();var l=Math.ceil(this._getRowCount()/this.getNumberOfRows());if(c===l){return this}this.getAggregation("footerPager").setCurrentPage(l);if(this.getDomRef()&&this.bShowAnimation){if(this.sCurrentAnimation!==null){this.aAnimationQueue.push({name:R.LAST_PAGE,animationFunction:this.lastPage,args:arguments});return this}else{this.sCurrentAnimation=R.LAST_PAGE}this.iPreviousPage=c;this.setProperty("currentPage",l,true);this.startPagingAnimation()}else{this.setCurrentPage(l)}this.firePage({currentPage:l,previousPage:c});return this};R.prototype.previousPage=function(){if(this.getShowMoreSteps()>0){return this}var c=this.getCurrentPage();if(c<=1){return this}this.getAggregation("footerPager").setCurrentPage(c-1);if(this.getDomRef()&&this.bShowAnimation){if(this.sCurrentAnimation!==null){this.aAnimationQueue.push({name:R.PREVIOUS_PAGE,animationFunction:this.previousPage,args:arguments});return this}else{this.sCurrentAnimation=R.PREVIOUS_PAGE}this.iPreviousPage=c;this.setProperty("currentPage",c-1,true);this.startPagingAnimation()}else{this.setCurrentPage(c-1)}this.firePage({currentPage:c-1,previousPage:c});return this};R.prototype.nextPage=function(){if(this.getShowMoreSteps()>0){return this}var c=this.getCurrentPage();var l=Math.ceil(this._getRowCount()/this.getNumberOfRows());if(c>=l){return this}this.getAggregation("footerPager").setCurrentPage(c+1);if(this.getDomRef()&&this.bShowAnimation){if(this.sCurrentAnimation!==null){this.aAnimationQueue.push({name:R.NEXT_PAGE,animationFunction:this.nextPage,args:arguments});return this}else{this.sCurrentAnimation=R.NEXT_PAGE}this.iPreviousPage=c;this.setProperty("currentPage",c+1,true);this.startPagingAnimation()}else{this.setCurrentPage(c+1)}this.firePage({currentPage:c+1,previousPage:c});return this};R.prototype.gotoPage=function(p){if(this.getShowMoreSteps()>0){return this}var c=this.getCurrentPage();var l=Math.ceil(this._getRowCount()/this.getNumberOfRows());if(p<1||p>l||c===p){return this}this.getAggregation("footerPager").setCurrentPage(p);if(this.getDomRef()&&this.bShowAnimation){if(this.sCurrentAnimation!==null){this.aAnimationQueue.push({name:R.GOTO_PAGE,animationFunction:this.gotoPage,args:arguments});return this}else{this.sCurrentAnimation=R.GOTO_PAGE}this.iPreviousPage=c;this.setProperty("currentPage",p,true);this.startPagingAnimation()}else{this.setCurrentPage(p)}this.firePage({currentPage:p,previousPage:c});return this};R.prototype.setNumberOfRows=function(n){this.setProperty("numberOfRows",n);if(this.getBinding("rows")){this.updateRows(true)}this.updateChildControls();return this};R.prototype.setCurrentPage=function(c){if(this.getCurrentPage()!=c){this.setProperty("currentPage",c);if(this.getBinding("rows")){this.updateRows(true)}this.updateChildControls()}return this};R.prototype.setShowMoreSteps=function(s){var n=s>0?false:true,b=this.getBinding("rows");if(n!==this.bPagingMode){this.bPagingMode=n;this.setCurrentPage(1)}this.setProperty("showMoreSteps",s);if(b){this._bSecondPage=false;this.updateRows(true)}return this};R.prototype.insertRow=function(r,i){this.insertAggregation("rows",r,i);this.updateChildControls();return this};R.prototype.addRow=function(r){this.addAggregation("rows",r);this.updateChildControls();return this};R.prototype.removeRow=function(e){this.removeAggregation("rows",e);this.updateChildControls();return this};R.prototype.removeAllRows=function(){this.removeAllAggregation("rows");this.updateChildControls();return this};R.prototype.destroyRows=function(){this.destroyAggregation("rows");this.updateChildControls();return this};R.prototype.setThreshhold=function(t){this.setProperty("threshold",t,true);return this};R.prototype.insertFilter=function(f,i){var t=this.getAggregation("filterToolbar");var F=f.getId();var b=new sap.ui.commons.Button({text:f.getText(),icon:f.getIcon(),tooltip:f.getTooltip(),press:[function(){this.applyFilter(F)},this]});t.insertItem(b,i);this.insertAggregation("filters",f,i);return this};R.prototype.addFilter=function(f){var t=this.getAggregation("filterToolbar");var F=f.getId();var b=new sap.ui.commons.Button({text:f.getText(),icon:f.getIcon(),tooltip:f.getTooltip(),press:[function(){this.applyFilter(F)},this]});t.addItem(b);this.addAggregation("filters",f);return this};R.prototype.removeFilter=function(e){var t=this.getAggregation("filterToolbar");t.removeItem(e);return this.removeAggregation("filters",e)};R.prototype.removeAllFilters=function(){var t=this.getAggregation("filterToolbar");t.removeAllItems();return this.removeAllAggregation("filters")};R.prototype.destroyFilters=function(){var t=this.getAggregation("filterToolbar");t.removeAllItems();this.destroyAggregation("filters");return this};R.prototype.insertSorter=function(s,i){var t=this.getAggregation("sorterToolbar");var S=s.getId();var b=new sap.ui.commons.Button({text:s.getText(),icon:s.getIcon(),tooltip:s.getTooltip(),press:[function(){this.triggerSort(S)},this]});t.insertItem(b,i);this.insertAggregation("sorters",s,i);return this};R.prototype.addSorter=function(s){var t=this.getAggregation("sorterToolbar");var S=s.getId();var b=new sap.ui.commons.Button({text:s.getText(),icon:s.getIcon(),tooltip:s.getTooltip(),press:[function(){this.triggerSort(S)},this]});t.addItem(b);this.addAggregation("sorters",s);return this};R.prototype.removeSorter=function(e){var t=this.getAggregation("sorterToolbar");t.removeItem(e);return this.removeAggregation("sorters",e)};R.prototype.removeAllSorters=function(){var t=this.getAggregation("sorterToolbar");t.removeAllItems();return this.removeAllAggregation("sorters")};R.prototype.destroySorters=function(){var t=this.getAggregation("sorterToolbar");t.removeAllItems();this.destroyAggregation("sorters");return this};R.prototype.startPagingAnimation=function(){var c=sap.ui.getCore(),r=c.getRenderManager(),i=this.getId(),p=this.iPreviousPage,P=this.getCurrentPage(),N=this.getNumberOfRows(),s=(P-1)*N,b=this.getRows(),d=this._getRowCount()>N*P?N:this._getRowCount()-N*(P-1),n,B=this.getBinding("rows");var D,j=this.$("page_"+p),o=this.getDomRef("body"),J=q(o);J.css("height",J.outerHeight());var e;if(sap.ui.getCore()&&sap.ui.getCore().getConfiguration()&&sap.ui.getCore().getConfiguration().getRTL()){e=(P<p)?"left":"right"}else{e=(P<p)?"right":"left"}if(B){this._bSecondPage=!this._bSecondPage;this.updateRows(true);b=this.getRows();s=(this._bSecondPage?1:0)*N}var S="\"top:-"+j.outerHeight(true)+"px;"+e+":"+j.outerWidth(true)+"px;\"";q("<ul id=\""+i+"-page_"+P+"\" class=\"sapUiRrPage\" style="+S+"/>").appendTo(o);var f=o.lastChild;var g=q(f);for(n=s;n<s+d;n++){q("<li id=\""+i+"-row_"+n+"\" class=\"sapUiRrRow\"/>").appendTo(f);D=f.lastChild;r.render(b[n],D)}if(e==="right"){j.animate({right:-j.outerWidth(true)},"slow");g.animate({right:0},"slow")}else{j.animate({left:-j.outerWidth(true)},"slow");g.animate({left:0},"slow")}J.animate({height:g.outerHeight(true)},"slow",q.proxy(this.endPagingAnimation,this))};R.prototype.endPagingAnimation=function(){var d=this.getDomRef("body");var D=this.getDomRef("page_"+this.iPreviousPage);var o=this.getDomRef("page_"+this.getCurrentPage());var j=q(o);q(d).css("height","");q(D).remove();var s;if(sap.ui.getCore()&&sap.ui.getCore().getConfiguration()&&sap.ui.getCore().getConfiguration().getRTL()){s=(this.getCurrentPage()<this.iPreviousPage)?"left":"right"}else{s=(this.getCurrentPage()<this.iPreviousPage)?"right":"left"}j.css("top","");j.css(s,"");this.sCurrentAnimation=null;this.nextQueuedAnimation()};R.prototype.startResizeAnimation=function(){var r=sap.ui.getCore().getRenderManager(),N=this.getNumberOfRows(),o=this.iPreviousNumberOfRows,i=this.getId(),s=0,b,B=this.getBinding("rows");var d,D=this.getDomRef("body"),j=q(D),c=this.getDomRef("page_"+this.getCurrentPage());j.css("height",j.outerHeight());if(B){this.updateRows(true)}b=this.getRows();if(N>o){for(var n=o;n<N;n++){q("<li id=\""+i+"-row_"+n+"\" class=\"sapUiRrRow\"/>").appendTo(c);d=c.lastChild;r.render(b[n],d)}}else{for(var n=N;n<o;n++){d=this.getDomRef("row_"+n);s-=q(d).outerHeight(true);this.aRemoveBuffer.push(d)}}j.animate({height:q(c).outerHeight(true)+s},"slow",q.proxy(this.endResizeAnimation,this))};R.prototype.endResizeAnimation=function(){var d=this.getDomRef("body");while(this.aRemoveBuffer.length>0){q(this.aRemoveBuffer.pop()).remove()}q(d).css("height","");this.sCurrentAnimation=null;this.nextQueuedAnimation()};R.prototype.nextQueuedAnimation=function(){var n,l;var c=1;var Q=this.aAnimationQueue;var p,N;if(Q.length>0){n=Q.shift()}if(n&&Q.length>0){while(Q[0]&&Q[0].name===n.name){c++;l=Q.shift()}if(c>0){switch(n.name){case R.SHOW_MORE:N=Math.min(this._getRowCount(),this.getNumberOfRows()+this.getShowMoreSteps()*c);n={name:R.RESIZE,animationFunction:this.resize,args:[N]};break;case R.RESIZE:n=l;break;case R.FIRST_PAGE:break;case R.LAST_PAGE:break;case R.PREVIOUS_PAGE:p=Math.max(1,this.getCurrentPage()-c);n={name:R.GOTO_PAGE,animationFunction:this.gotoPage,args:[p]};break;case R.NEXT_PAGE:p=Math.min(Math.ceil(this._getRowCount()/this.getNumberOfRows()),this.getCurrentPage()+c);n={name:R.GOTO_PAGE,animationFunction:this.gotoPage,args:[p]};break;case R.GOTO_PAGE:n=l;break}}}if(n){n.animationFunction.apply(this,n.args)}};R.prototype.paging=function(e){switch(e.getParameter("type")){case sap.ui.commons.PaginatorEvent.First:this.firstPage();break;case sap.ui.commons.PaginatorEvent.Last:this.lastPage();break;case sap.ui.commons.PaginatorEvent.Previous:this.previousPage();break;case sap.ui.commons.PaginatorEvent.Next:this.nextPage();break;case sap.ui.commons.PaginatorEvent.Goto:this.gotoPage(e.getParameter("targetPage"));break}};R.prototype.updateChildControls=function(){var s,p;var S;if(this.bPagingMode){var c=this.getCurrentPage();var l=Math.ceil(this._getRowCount()/this.getNumberOfRows());if(this._getRowCount()==0){l=1}p=this.getAggregation("footerPager");if(p){p.setCurrentPage(c);p.setNumberOfPages(l)}}else{S=this._getRowCount()>this.getNumberOfRows();s=this.getAggregation("headerShowMoreButton");if(s){s.setEnabled(S)}s=this.getAggregation("footerShowMoreButton");if(s){s.setEnabled(S)}}};R.prototype.isBound=function(n){return sap.ui.core.Element.prototype.isBound.call(this,n||"rows")};R.prototype._getRowCount=function(){var b=this.getBinding("rows");if(b){return b.getLength()}else{return this.getRows().length}};R.prototype.unbindAggregation=function(n){sap.ui.core.Element.prototype.unbindAggregation.apply(this,arguments);if(n==="rows"){this.destroyRows()}return this};R.prototype.refreshRows=function(){var b=this.getBindingInfo("rows"),B=b.binding,r=this._getRowCount(),n=this.getNumberOfRows(),N=Math.min(r,n),t=this.getThreshold();this.setProperty("currentPage",1,true);B.getContexts(0,N,t)};R.prototype.updateRows=function(v){var b=this.getBindingInfo("rows"),f=b.factory,B=b.binding,s=this.getShowMoreSteps(),S=s>0,c=this.getCurrentPage(),r=this._getRowCount(),n=this.getNumberOfRows(),N=Math.min(r,n),L=Math.ceil(r/n)||1;if(c>L){c=L;this.setProperty("currentPage",c);this._bSecondPage=false}var F=S?0:(c-1)*N,d=(this._bSecondPage?1:0)*N,t=this.getThreshold(),e=B?B.getContexts(F,N,t):[];if(v!==true){this._bSecondPage=false;this.destroyRows();for(var i=0,l=N;i<l;i++){var I=this.getId()+"-"+i,o=f(I,e[i]);o.setBindingContext(e[i],b.model);this.addRow(o)}}else{this._bSuppressInvalidate=true;for(var i=0,l=N;i<l;i++){var g=d+i;var h=this.getRows()[g];if(!S){if(h){this.removeAggregation("rows",h,true);h.destroy()}h=undefined}if(!h){var I=this.getId()+"-"+g;h=f(I,e[i]);h.setBindingContext(e[i],b.model);this.insertAggregation("rows",h,g,true)}else{h.setBindingContext(e[i],b.model)}}this._bSuppressInvalidate=false}this.updateChildControls()};R.prototype.invalidate=function(o){if(this._bSuppressInvalidate){return}C.prototype.invalidate.apply(this,arguments)};return R},true);
