export default {
	namespace : "picshow" ,
	state : {
		"nowcolor" : 0 , 			//当前颜色
		"nowtype"  : 0 ,			//当前类型
		"nowidx"   : 0 , 			//当前的图片的序号
		"colors"   : [],			//颜色数组
		"types"    : [],			//图集名字的数组
		"data"     : {}
	} ,
	reducers : {
		//拉取默认数据
		init_sync(state , {data}){
			var colorsarr = Object.keys(data.colors);
			//这里控制types的顺序：
			var types = [];
			if(Object.keys(data.colors[colorsarr[0]].types).includes("view")){
				types.push("view");
			}

			if(Object.keys(data.colors[colorsarr[0]].types).includes("center")){
				types.push("center");
			}

			if(Object.keys(data.colors[colorsarr[0]].types).includes("detail")){
				types.push("detail");
			}

			return {
				...state , 
				data ,
				colors : colorsarr ,
				types : types
			}
		},
		//改变图集
		changetype(state , {typename}){
			return {
				...state , 
				nowtype : state.types.indexOf(typename)
			}
		},
		//改变颜色
		changecolor(state , {n}){
			var colorsarr = Object.keys(state.data.colors);
			var types = [];
			if(Object.keys(state.data.colors[colorsarr[n]].types).includes("view")){
				types.push("view");
			}

			if(Object.keys(state.data.colors[colorsarr[n]].types).includes("center")){
				types.push("center");
			}

			if(Object.keys(state.data.colors[colorsarr[n]].types).includes("detail")){
				types.push("detail");
			}

			return {
				...state , 
				types : types,
				nowcolor : n ,
				nowtype : 0
			}
		},
		//变图 
		changepic(state , {n}){
			return {
				...state , 
				nowidx : n
			}
		},
		//下一张
		gonext(state){
			return {
				...state ,
				nowidx : state.nowidx + 1
			}
		}
	},
	effects : {
		init : function* (state , {put}){
			var data = yield fetch("/api/car/AiRuize").then((data)=>{
				return data.json();
			});
			yield put({"type" : "init_sync" , data});
		}
	}
}