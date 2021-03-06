// JavaScript Document
var defaultwidth = 0;

$(document).live('pagebeforeshow', function(event) {
	if ($(document).width() <= 480) {
		if (defaultwidth == 0)
			defaultwidth = $(document).width() - 80;
		$('#' + event.target.id + '_box .img img').width(defaultwidth);
	} else {
		var top = (-$(document).height()/3);
		if(event.target.id == 'step_eight')
			top = top + (top / 2);
		$('#' + event.target.id + '_box').css({
			'margin-top' : top + 'px',
			'margin-left' : '-250px',
			'position' : 'absolute',
			'top' : '50%',
			'left' : '50%'
		});
	}
	if (event.target.id == 'step_four') {
	} else if (event.target.id == 'step_three') {
		$('#interest-number').children('option').attr('selected',false).first().attr('selected',true).parent().selectmenu('refresh');
	} 
	$('#' + event.target.id + '_box input[type=button]').button().button('disable');
});

$(document).ready(function() {
	$('div').ajaxError(function() {
		
	});
	//$.mobile.changePage('#step_zero');
	$.mobile.touchOverflowEnabled = true;
	
	$('.img').each(function() {
		$(this).css('background-size', $(this).css('width') + ' ' + $(this).css('height'));
	});	
	
/*	$('#btn_campus').click(function() {
		$.mobile.changePage('#step_one');
	});
        
	$('#crave_next').click(function() {
		$.mobile.changePage('#step_two');
	});
        
	$('#btn_interest').click(function() {
		$.mobile.changePage('#step_four');
	});
	
	$('#btn_sj').click(function() {
		$.mobile.changePage('#step_five');
	});
	
	$('#btn_data').click(function() {
		$.mobile.changePage('#step_five');
	});
	
	$('#btn_info').click(function() {
		$.mobile.changePage('#step_six');
	});
*/	
	$('#btn_submit').click(function() {
            $.mobile.changePage('#step_seven');
		submit_survey();
	});
	$('#btn_retry').click(function() {
		$('#btn_retry').button('disable');
		submit_survey();
	});
	
	$('.reset').click(function() {
		$.mobile.changePage('#step_one', { 'reverse' : true });
		$('#fname, #lname').val('');
		$('#cellphone').val('');
		$('#coolest').val('');
	});
/*        
        $('#btn_sj').button('disable');
	$("#sj-select").change(function(){
		if ($("#sj-select").val() == "")
			$('#btn_sj').button('disable');
		else
			$('#btn_sj').button('enable');
	});
*/	
	$('#interest-number').change(function() {
		if ($('#interest-number').val() != 'Choose')
			$('#btn_interest').button('enable');
		else
			$('#btn_interest').button('disable');
	});
	
	
	$('#fname').keyup(data_check);
	$('#lname').keyup(data_check);
	$('#gender').change(data_check);
	$('#major').change(data_check2);
	$('#year').change(data_check2);
	$('#cellphone').keyup(data_check);
        
});


function submit_survey() {
        var cravemost = $('#input-other').val();
        if($('#cravemost-select').val() != 'other')cravemost = $('#cravemost-select').val();
    
	var my_data = {
			fname :$('#fname').val(),
			lname :$('#lname').val(),
			gender : $('#gender').val(),  

			email: $('#email').val(),
			number : $('#cellphone').val(),

			cravemost : cravemost,
			spiritual : $('#sj-select').val(),
			interest : $( "#interest-number" ).val(),
			// Magazine name
			magazine: $('#magazine-select').val(),

			major : $('#major').val(),
			year : $('#selyear').val(),

			campus : $('#campussel').val(),
			residence: $('#residence').val(),

			// International student?
			international: $('#international').attr('checked') ? 'Yes' : 'No'
		};
        //var mytable = '<table><tr><td>name</td><td>' + my_data.fname + ' ' + my_data.lname + '</td></tr><tr><td>Gender</td><td>' + my_data.gender + '</td></tr><tr><td>Email</td><td>' + my_data.email + '</td></tr><tr><td>Cellphone</td><td>' + my_data.number + '</td></tr><tr><td>Interest</td><td>' + my_data.interest + '</td></tr><tr><td>Spiritual</td><td>' + my_data.spiritual + '</td></tr><tr><td>Magazine</td><td>' + my_data.magazine + '</td></tr><tr><td>Faculty</td><td>' + my_data.major + '</td></tr><tr><td>Year</td><td>' + my_data.year + '</td></tr><tr><td>Campus</td><td>' + my_data.campus + '</td></tr><tr><td>Residence</td><td>' + my_data.residence + '</td></tr><tr><td>International</td><td>' + my_data.international + '</td></tr></table>';
        //$('#server-message-area').html(mytable);
        
	$.post(base_url + "index.php/api/journey/user", my_data
		, function(data, status, request) {
			$.mobile.changePage('#step_eight');
	}, "json").error(function() {
		$('#btn_retry').button('enable');
                
	});
}

function data_check() {
        var phone = /^02\d{7,13}$/
	if (
		$('#fname').val() != '' &&
		$('#lname').val() != '' &&
		phone.test($('#cellphone').val()) &&
		$('#email').val() != '' &&
		$('#gender').val() != ''
	)
			$('#btn_info').button('enable');
		else
			$('#btn_info').button('disable');
}

function data_check2() {
	if (
		$('#major').val() != 'Area of Study' &&
		$('#year').val() != 'Year of Study'
	)
			$('#btn_submit').button('enable');
		else
			$('#btn_submit').button('disable');
}