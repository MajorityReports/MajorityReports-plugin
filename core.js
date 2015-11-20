

function Core(){
  var settings = localStorage.getItem('MajorityReports');
  try{
    this.settings = JSON.parse(settings);
  } catch(err){
    this.settings = JSON.parse(ini());
  }
  console.log(settings);
  this.keyhandler = new Keyhandler();

  function saveSecret(){
    this.settings = $secret.val();
    $secret.blur().removeClass('changed');
    $button.removeClass('open');
  }


  var $button, $pane, $secret;
  var pane, secret;

  $secret = $(`<input id='mr-secret' type=text value=${this.settings.secret} />`);
  $pane = $(`<div class='mr-pane'/>`).append($secret);
  $button = $(`<div class='mr-icon'/>`)
  .on('click', function(e){
    e.stopPropagation();
    $(this).addClass('open');
  })
  .on('keydown', this.keyhandler)
  .on('input', 'input', function(){$secret.addClass('changed')});

  $secret.before($(`<label for='mr-secret'>Not-secret: </label>`));

  this.keyhandler.map({
    onkeydown:{
      enter: saveSecret,
    }
  });
  $('body').addClass('majorityreports');
  $('#header-bottom-right').append($button);

  this.pane = $pane;
  $button.append(this.pane);
  $('body').on('click', function(){
    $button.removeClass('open');
  });


  this.ini = function(){
    var ini = {
      secret: 'MajorityReports'
    }

    localStorage.setItem('MajorityReports', JSON.stringify(ini));
    return ini;
  }
}
