// ref: https://shimz.me/blog/d3-js/3025
var width = 340,height = 500;
var fileName = "jp.json";//日本全土地図
var prefList={  "北海道":"01","青森県":"02","岩手県":"03","宮城県":"04","秋田県":"05",
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

d3.json(fileName, function(json) {
    d3main(json);
});

function d3main(json){
    var scale = 1500;
    var obj = json.objects.ne_10m_admin_1_states_provinces;
    var geodata = topojson.feature(json, obj).features;
 
    projection = d3.geo
        .mercator()		//投影法の指定
        .scale(scale)	//スケール（ズーム）の指定
        .translate([300,350])
        .center([139.0032936, 36.3219088]); //中心の座標を指定
 
    var path = d3.geo.path().projection(projection);　//投影
 
    var svg = d3.select("svg");
 
    //地図を描画
    var map =  svg.append("svg:g")
        .selectAll("path")
        .data(geodata)
        .enter()
        .append("svg:path")
        .attr({
            "d": path,
            "fill": "green",
            "fill-opacity": 0.5,
            "stroke": "black"
        });
        
    //ズームイベント設定    
    var zoom = d3.behavior.zoom().on('zoom', function(){
       projection.scale(scale * d3.event.scale);       
       map.attr('d', path)       
    });
    svg.call(zoom);
 
    //ドラッグイベント設定
    drag = d3.behavior.drag().on('drag', function(){
       var tl = projection.translate();
       projection.translate([tl[0] + d3.event.dx, tl[1] + d3.event.dy]);
       map.attr('d', path);
    });
    svg.call(drag);
        
}


