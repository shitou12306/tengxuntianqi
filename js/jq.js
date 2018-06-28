$(function(){

	$.ajax({
		url:'https://www.toutiao.com/stream/widget/local_weather/data/?city=太原',
		type:'POST',
		dataType:'jsonp',
		success:function(obj){  
        console.log(obj.data.weather);
        let st=obj.data.weather
        $("#txt-location").html(st.city_name); /*城市名*/
        $("#val").html(st.quality_level);/*空气质量*/
        $("#til").html(st.tomorrow_aqi);/**/
        $("#du").html(st.current_temperature+"°");/*当前温度*/
        $("#weather").html(st.current_condition);/*当前天气*/
        $(".feng").html(st.wind_direction+"&nbsp"+st.wind_level+"级"); /*当前风向*/

        /*第二*/
        $(".temperature").first().html(st.dat_high_temperature+"/"+st.dat_low_temperature+"°")
        $(".temperature").last().html(st.tomorrow_high_temperature+"/"+st.tomorrow_low_temperature+"°")
        $(".bottom .weather").first().html(st.dat_condition);
        $(".bottom .weather").last().html(st.tomorrow_condition);
        $(".bottom .logo").first().attr("src","img/"+st.dat_weather_icon_id+".png");
        $(".bottom .logo").last().attr("src","img/"+st.tomorrow_weather_icon_id+".png");

        /*第三*/
        st.hourly_forecast.forEach(function(elment,index){
        	let str=`<li>
				<p class="txt-time">${elment.hour}:00</p>
				<img src="img/${elment.weather_icon_id}.png" alt="" class="icon">
				<p class="txt-degree">${elment.temperature}°</p>
			</li>`
			$("#sec-hours .hours").append(str)
        })
        /*第四*/
        st.forecast_list.forEach(function(elment,index){
                let dates=elment.date.slice(5);
                let str=`<li>
                                <p class="day">昨天</p>
                                <p class="date">${dates}</p>
                                <div class="ct-daytime"><p class="weather">${elment.condition}</p><img src="img/${elment.weather_icon_id}.png" class="icon"></div>
                                <div class="ct-night"><img src="img/${elment.weather_icon_id}.png" class="icon"><p class="weather">${elment.condition}</p></div>
                                <p class="wind">${elment.wind_direction}</p>
                                <p class="wind">${elment.wind_level}级</p>
                        </li>`
                        $("#sec-days .days").append(str)

        })

        },
	})

})