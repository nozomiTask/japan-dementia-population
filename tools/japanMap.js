//EJS body
// 参考：　https://bl.ocks.org/mbostock/4699541

var startTime = Date.now(); // 開始時間
var endTime = Date.now(); // 終了時間

var width = 400,height = 600;
active = d3.select(null);
//初期値は、のちにscaleAreatocenterXYを計算して、設定し直すための、仮置き
var projection = "";
var path = "";

var prefList={  "日本":"00",
                "北海道":"01","青森県":"02","岩手県":"03","宮城県":"04","秋田県":"05",
                "山形県":"06","福島県":"07","茨城県":"08","栃木県":"09","群馬県":"10",
                "埼玉県":"11","千葉県":"12","東京都":"13","神奈川県":"14","新潟県":"15",
                "富山県":"16","石川県":"17","福井県":"18","山梨県":"19","長野県":"20",
                "岐阜県":"21","静岡県":"22","愛知県":"23","三重県":"24","滋賀県":"25",
                "京都府":"26","大阪府":"27","兵庫県":"28","奈良県":"29","和歌山県":"30",
                "鳥取県":"31","島根県":"32","岡山県":"33","広島県":"34","山口県":"35",
                "徳島県":"36","香川県":"37","愛媛県":"38","高知県":"39","福岡県":"40",
                "佐賀県":"41","長崎県":"42","熊本県":"43","大分県":"44","宮崎県":"45",
                "鹿児島県":"46","沖縄県":"47"
            };

//  d3.geo.mercator()
//     .center([ centerX, centerY ])
//     .translate([0,0])
//     .scale(0);


var svg = d3.select("body")
    .append("svg")
    .attr("class","jp")
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
    .attr("class","jp")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", reset);

var g = svg.append("g")
    .attr("class","jp")
    .style("stroke-width", "0.5px");

// // 都道府県地図用
// var svgPref = d3.select("body")
//     .append("svg")
//     .attr("class","pref")
//     .attr("width", widthPref)
//     .attr("height", heightPref);

// svgPref.append("rect")
//     .attr("class","pref")
//     .attr("class", "background")
//     .attr("width", widthPref)
//     .attr("height", heightPref)
//     .on("click", resetPref)
//     .append("g")
//     .attr("class","pref")
//     .style("stroke-width", "0.5px");


main();

function main(){
    var pn = "栃木県";
    var fileName = "topojson/"+prefList[pn]+".topojson";//都道府県ファイルを選択
    console.log("fileName:\n",fileName);

    d3.json(fileName, function(err,jp) {
        console.log("jp:\n",jp);
        if(err){
            console.log("error:",err);
            throw err;
        };
        var obj = jp.objects[prefList[pn]];
        mapDraw(jp,obj);
    });
}

function mapDraw(jp,obj){
    //最初の地図の中止点を計算
    console.log("obj:",obj);
    var features = topojson.feature(jp, obj).features;
    console.log("features:",features);
    var centerXY_ = centerXY(features);
    console.log("centerXY_:",centerXY_);
    //スケールとtranslateの計算
    var scaleAndTranslate_ = scaleAndTranslate(features,centerXY_);
    console.log("scaleAndTranslate_:",scaleAndTranslate_);
    var scaleArea_ = scaleAndTranslate_[0];
    var translateX = scaleAndTranslate_[1];
    var translateY = scaleAndTranslate_[2];
    
    projection = d3.geo.mercator()
        .center(centerXY_)
        .translate([translateX, translateY])
        .scale(scaleArea_);
    path = d3.geo.path().projection(projection);

    g.selectAll("path")
        .data(features) // geojsonのすべての県の座標データを読み込む。
        .enter()
        .append("path") 
        .attr("d",path) 
        .attr("class", "feature")
        .on("mouseover", function(d,i) {
        d3.select(this)
            .transition()
            .style("fill", "lightgreen");
        })
        .on("mouseout", function(d,i) {
            d3.select(this)
            .transition()
            .style("fill", "#ccd");
        })
        .on('click',clicked)
        ;
    var fontSize = String((2*scaleArea_/1000))+"pt";
    console.log("fontSize:",fontSize);
    g.selectAll("text")
        .data(features) // geojsonのすべての県の座標データを読み込む。
        .enter()
        .append("text")
        .text((d)=> {
            if(d.properties.N03_004==undefined){
                //日本全土
                var nm = d.properties.N03_001;
            }else{//各都道府県
                var N03_003 = d.properties.N03_003;
                var N03_004 = d.properties.N03_004; 
                if(d.properties.N03_003==null){
                    var nm = N03_004;
                }else{
                    var nm = N03_003 + N03_004;
                }
            }
            return nm;})
        .attr('x',(d)=>{
            if(d.properties.N03_001=="東京都" && d.properties.N03_004==undefined){
                var pos = projection([139.34,35.64]);
            }else{
                var pos = projection(d3.geo.centroid(d.geometry));
            }
            return pos[0];
        })
        .attr('y',(d)=>{
            if(d.properties.N03_001=="東京都" && d.properties.N03_004==undefined){
                var pos = projection([139.34,35.64]);
            }else{
                var pos = projection(d3.geo.centroid(d.geometry));
            }
            return pos[1];
        })
        .attr("text-anchor","middle")
        .attr('font-size',fontSize)
        .attr('fill','blue')
        .on('click',clicked)
        ;
        
    g.append("path")
        .datum(topojson.mesh(jp, obj,(a,b)=>{return a != b;}))
        .attr("class", "mesh")
        .attr("d", path);

};
//scale=1000の時で計算する。
function scaleAndTranslate(features,centerXY_){
    var scaleAndTranslate__ =[];
    projection_dummy = d3.geo.mercator()
        .center(centerXY_)
        .translate([width/2, height/2])
        .scale(1000);
    path_dummy = d3.geo.path().projection(projection_dummy);
    var minX=100000,minY=100000,maxX=-100000,maxY=-100000;
    for (var area in features){
        var bounds = path_dummy.bounds(features[area]);
        minX = Math.min(bounds[0][0], minX);
        minY = Math.min(bounds[0][1], minY);
        maxX = Math.max(bounds[1][0], maxX);
        maxY = Math.max(bounds[1][1], maxY);
        // console.log(bounds[0][0],bounds[0][1],bounds[1][0],bounds[1][1]);
    }
    var widthX = maxX - minX;
    var heightY = maxY - minY;

    //width height比の小さい方に合わせる
    ratioMin = Math.min(width/widthX, height/heightY);
    console.log("ratioMin:",ratioMin);
    scaleAndTranslate__.push(1000.0 * ratioMin);
    var ratio_ = 0.9*ratioMin;
    var centerX_ = ratio_* widthX/2;
    var centerY_ = ratio_ * heightY/2;
    scaleAndTranslate__.push(width/2 - centerX_+ minX);
    scaleAndTranslate__.push(height/2 - centerY_+ minY);
    // console.log("minX,minY,maxX,maxY",minX,minY,maxX,maxY);
    return scaleAndTranslate__;
}
//領域のacrの中心点の計算
function centerXY(features){
    var count = 0, X = 0, Y = 0;
    for (var area in features)
    {
        count ++;
        X += d3.geo.centroid(features[area])[0];
        Y += d3.geo.centroid(features[area])[1];    
    }
    return [X/count,Y/count];
}


function clicked(area) {
    console.log("area:",area);
    if(area.properties.N03_004==undefined){
        //日本全土
        var nm = area.properties.N03_001+":";
    }else{//各都道府県
        if(area.properties.N03_003==null){
            var nm = area.properties.N03_004;
        }else{
            var nm = area.properties.N03_003 + " " + area.properties.N03_004;
        }
    }
    console.log("nm: in input", nm);
    
    // d3.select("form").remove();
    var form = d3.select("body")
        .select("form")
        .attr("method","get")
        .attr("action","/");
    form.append("input")
        .attr("type","text")
        .attr("name","message")
        .attr("value",nm);

    form.append("input")
        .attr("type","submit")
        .attr("value","送信");

    
    // d.properties.prefNameで都道府県名が入る
    //地図の拡大
    if (active.node() === this) return reset();
    active.classed("active", false);
    active = d3.select(this).classed("active", true);
    
    startTime = Date.now();
    var bounds = path.bounds(area),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = .9/ Math.max(dx / width, dy / height),
        translate = [width / 2 - scale * x, height / 2 - scale * y];
    g.transition()
        .duration(750)
        .style("stroke-width", 1.5 / scale + "px")
        .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
  
    endTime = Date.now();
    console.log("都道府県クリック後描画前まで",endTime - startTime);
}


    // //都道府県への展開
    // startTime = Date.now();
        
    // var centerXPref = d3.geo.centroid(d.geometry)[0];
    // var centerYPref = d3.geo.centroid(d.geometry)[1];
    // console.log(centerXPref, centerYPref);
    // var projectionPref = d3.geo.mercator()
    //     .center([ centerXPref, centerYPref ])
    //     .translate([width/2, height/2])
    //     .scale(10000);
    // var pathPref = d3.geo.path()
    //     .projection(projectionPref);

    // var pn = d.properties.prefName;
    // console.log("prefectureName:",pn);

    
    // var filePrefName = "topojson/"+prefList[pn]+".topojson";//都道府県ファイルを選択
    // // console.log("num:",num);
    // d3.json(filePrefName, function(err, pref) {
    //     if(err){
    //         console.log("filePrefName error:",err);
    //         throw err;
    //     }
    //     // console.log("pref:",pref);
    //     var objPref = pref.objects[prefList[pn]];
    //     // console.log("objPref:",objPref);
    //     var featurePref = topojson.feature(pref, objPref).features;
    //     // console.log("featureArea:",featureArea);
    //     var prefName = featurePref[0].properties.N03_001;
    //     console.log("prefName:",prefName);

    //     svgPref.selectAll("path").remove();
    //     svgPref.selectAll("text").remove();
        
    //     svgPref.selectAll("path")
    //         .data(featurePref) // geojsonのすべての県の座標データを読み込む。
    //         .enter()
    //         .append("path")
    //         .attr("d",pathPref) 
    //         .attr("class", "featurePref")
    //         .on('click',clickedPref);
    //     svgPref.selectAll("text")
    //         .data(featurePref) // geojsonのすべての県の座標データを読み込む。
    //         .enter()
    //         .append("text")
    //         .text((dPref)=> {
    //             var buf = dPref.properties.N03_003;
    //             if (buf == null){ buf ="";}
    //             return buf+" "+dPref.properties.N03_004;})
    //         .attr('x',(dPref)=>{
    //             var pos = projectionPref(d3.geo.centroid(dPref.geometry));
    //             return pos[0];
    //         })
    //         .attr('y',(dPref)=>{
    //             var pos = projectionPref(d3.geo.centroid(dPref.geometry));
    //             return pos[1];
    //         })
    //         // .attr("text-anchor","middle")
    //         .attr('font-size','5pt')
    //         .attr('fill','red')
    //         .on('click',clickedPref)
    //         ;         
    //     svgPref.append("path")
    //         .datum(topojson.mesh(pref, objPref,(a,b)=>{return a != b;}))
    //         .attr("class", "mesh")
    //         .attr("d", pathPref);
    //     endTime = Date.now();
    //     console.log("市区町村クリック後描画時間",endTime - startTime);
    // });

  

// function clickedPref(d) {
//     // dにはクリックした市区町村が入る
//     var buf = d.properties.N03_003;
//     if (buf == null){ buf ="";}
//     buf = buf+" "+d.properties.N03_004;
//     console.log("市区町村名:",buf);

//     //クリックした市区町村をクローズアップする
//     startTime = Date.now();
//     if (active.node() === this) return resetPref();
//     active.classed("active", false);
//     active = d3.select(this).classed("active", true);
  
//     var bounds = path.bounds(d),
//         dx = bounds[1][0] - bounds[0][0];//横幅
//         dy = bounds[1][1] - bounds[0][1];//縦幅
//         x = (bounds[0][0] + bounds[1][0]) / 2;//横中心
//         y = (bounds[0][1] + bounds[1][1]) / 2;//縦中心

//         scale = [2,2];//.1/ Math.max(dx / widthPref, dy / heightPref);
//         translate = [widthPref / 2 -  x, heightPref / 2 - y];
//     svgPref.transition()
//         .duration(750)
//         .style("stroke-width", 1.5 / scale + "px")
//         // .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
//     endTime = Date.now();
//     console.log("市区町村再クリック後拡大縮小再描画時間",endTime - startTime);
    
//     d3.selectAll("form").remove();

//     var formPref = d3.select("body")
//         .append("form")
//         .attr("method","get")
//         .attr("action","/");
//     formPref
//         .append("input")
//         .attr("type","text")
//         .attr("name","message")
//         .attr("value",buf)
//         ;
//     formPref
//         .append("input")
//         .attr("type","submit")
//         .attr("value","送信")
//         ;
// }

function reset() {
    // gPref.selectAll("path").remove();
    // gPref.selectAll("text").remove();

    startTime = Date.now();
    active.classed("active", false);
    active = d3.select(null);
  
    g.transition()
        .duration(750)
        .style("stroke-width", "0.5px")
        .attr("transform", "");
    endTime = Date.now();
    console.log("都道府県再クリック後拡大縮小再描画時間（リセット）",endTime - startTime);
  }

function resetPref() {
    startTime = Date.now();
    active.classed("active", false);
    active = d3.select(null);
  
    svgPref.transition()
        .duration(750)
        .style("stroke-width", "0.5px")
        .attr("transform", "");
        endTime = Date.now();
    console.log("市区町村再クリック後拡大縮小再描画時間（リセット）",endTime - startTime);
}
