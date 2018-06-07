'use strict';
$(function () {
	var $cont = $('.m-container');
	var $slider = $('.slider');   
	var animSpd = 1000; //�ٶ�
	var curSlide = 1;     //��ʼ
	var animation = false;   //������־
	var numOfCities =10;   //ҳ�����

	//��Ƿ�ֹ��������
	function flag() {
		animation = false;
	}

	//������ҳ
	function pagination(direction) {
		animation = true;
		$slider.addClass('animation');
		
		//���������ƶ�100%
		$slider.css({
			'transform': 'translate3d(-' + (curSlide - direction) * 100 + '%, 0, 0)'
		});
		
		//�ֲ����ұ��ƶ�50%
		$slider.find('.slide__darkbg').css({
			'transform': 'translate3d(' + (curSlide - direction) * 50 + '%, 0, 0)'
		});
		
		//��items�в��������ж������Ե�DOM
		var $animates = $("body").find(".animated");
		$animates.each(function(index, value) {
			var $this = $(this);
			var animationStyle = $this.data("class");    //����CSS
			var animationDelay = $this.data("delay");  //�����ӳ�ʱ��
			$this.addClass(animationStyle).css({
				"-moz-animation-delay": animationDelay,
				"-webkit-animation-delay": animationDelay,
				"animation-delay": animationDelay
			});
		});
	}

	//mousewheel - IE��chrome ��  DOMMouseScroll - firefox
	$(document).on('mousewheel DOMMouseScroll', function (e) {
		if (animation) return;
		//����������
		var delta = e.originalEvent.wheelDelta;  
		
		//delta > 0 ���Ϲ�/���ҹ�
		if (delta > 0 || e.originalEvent.detail < 0) {
			if (curSlide <= 1) return;
			pagination(2);
			//��Ϊ����һ�λ��������������е�������һ��֮�󣬾ͽ�animation=true��֯����
			setTimeout(flag, animSpd);
			
			//����ҳ��
			var num = curSlide--;
			$(".page").html( (num-1) + "/" + numOfCities);
			
			//��������ҳ������
			var $sliders = $slider.find(".slide");
			$sliders.each(function(i) {
				$( $sliders[i] ).fadeOut();
			})
			//���ù���Ŀ��ҳ����ʾ
			$( $sliders[num-2] ).fadeIn();
			
		}
		
		//delta < 0 ���¹�/���ҹ�
		if (delta < 0 || e.originalEvent.detail > 0) {
			if (curSlide >= numOfCities) return;
			pagination(0);
			setTimeout(flag, animSpd);
			var num = curSlide++;
			$(".page").html( (num+1) + "/" + numOfCities);
			
			var $sliders = $slider.find(".slide");
			$sliders.each(function(i) {
				$( $sliders[i] ).fadeOut();
			})
			$( $sliders[num] ).fadeIn();
		}
	});
});