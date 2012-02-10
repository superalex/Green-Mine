var backlog_handlers = function() {
    $(".un-us-item .delete").live('click', function(event) {
        event.preventDefault();
    });
    
    $(".config-us-inline").live('click', function(event) {
        event.preventDefault();
        var elm = $(this);
        $.get($(this).attr('href'),  function(data) {
            elm.closest('.un-us-item').find('.form-inline').html(data).show();
        }, 'html');
    });
    
    $(".user-story-inline-submit").live('click', function(event) {
        event.preventDefault();
        var elm = $(this);
        $.post($(this).closest('form').attr('action'),  $(this).closest('form').serialize(),function(data) {
           elm.closest('.un-us-item').find('.form-inline').html(data);
        }, 'html');        
    });
    
    $(".user-story-inline-cancel").live('click', function(event) {
        event.preventDefault();
        $(this).closest('.un-us-item').find('.form-inline').hide();
    });    

    $(".us-item .unassign").live('click', function(event) {
        event.preventDefault();
        var self = $(this);
        var pself = self.parents('.us-item');

        var buttons = {};
        buttons[gettext("Unassign")] = function() {            
            $.post(pself.attr('unassignurl'), {}, function(data) {
                $(".unassigned-us").prepend(data);
                
                var milestone_item_dom = self.parents('.milestone-item');
                if (milestone_item_dom.find('.milestone-userstorys .us-item').length == 1) {
                    pself.find('.us-meta').remove()
                    pself.find('.us-title').html(gettext("No user storys"));
                    pself.addClass('us-item-empty');
                } else {
                    pself.remove();
                }
            }, 'html');

            $(this).dialog('close');
        };

        buttons[gettext("Delete")] = function() {
            self.parents('.us-item').remove();
            $(this).dialog('close');
        };

        $(".unassign-dialog").dialog({
            width: "220px",
            modal: true,
            resizable: false,
            buttons: buttons
        });
    });
    
    $(".milestone-item .milestone-title  a.delete").live('click', function(event){
        event.preventDefault();
        var self = $(this);
        // TODO: ajax call
        
        var buttons = {};
        buttons[gettext('Ok')] = function() {
            $(this).dialog('close');
            self.parents('.milestone-item').remove();
        };
        buttons[gettext('Cancel')] = function() {
            $(this).dialog('close');
        };

        $(".delete-milestone-dialog").dialog({
            modal: true,
            width: '220px',
            buttons: buttons
        });
    });
    
    //assign user story to milestone    
    
    var lightbox = $("#lightbox-backlog").lightbox({
        fadeIn: false,
        fadeOut: false,                
        width: 300
    });
    
    var us = {};
    $(".milestone a").live('click', function(e) {
        us = $(this);
        e.preventDefault();
        lightbox.open();
    });       
    
    $("#lightbox-backlog a").click(function(e){            
        e.preventDefault();
        var ml = $(this).attr('rel');
        
        $.post($(this).attr('href'), {'iref': us.attr('rel')}, function(data) {
            var milestone = $("#milestone-"+ml);
            if($(milestone).find('.us-item-empty').length > 0){
                $(milestone).find('.milestone-userstorys').html(data);
            }else{   
                $(milestone).find('.milestone-userstorys').append(data);
            }
        }, 'html');                
        
        us.closest('.un-us-item').remove();
        lightbox.close();
    });    
};

var settings_handlers = function() {
    $(".colors-form").on("click", ".tag-color-item .tag-rm", function(event) {
        $(this).parents(".tag-color-item").remove();
        if ($(".selected-colors .tag-color-item").length == 0) {
            $(".selected-colors").hide();
        }
    });

    $(".colors-form").on("click", "input[type='button']", function(event) {
        var new_dom = $('<div />', {'class': 'tag-color-item'});
        var name_dom = $('<div />', {'class': 'tag-name'});
        var color_dom = $('<div />', {'class': 'tag-color'});
        var close_dom = $('<div />', {'class': 'tag-rm'}).html("x");

        var tagname = $(this).parent().prev().prev().find('select').val();
        var colorvalue = $(this).parent().prev().find('input').val();
        
        name_dom.html(tagname);
        color_dom.css('background-color', colorvalue);
        color_dom.attr('val', colorvalue);

        new_dom
            .append(name_dom)
            .append(color_dom)
            .append(close_dom);
        
        console.log(tagname);

        if (tagname.length > 0) {
            $(".selected-colors").append(new_dom);
            $(".selected-colors").show();
        }
    });

    $(".width100 input[type=submit]").click(function(event) {
        event.preventDefault();
        
        var data = {};
        if ($('.tag-color-item').length > 0) {
            $('.tag-color-item').each(function() {
                var name = $(this).find(".tag-name").html();
                var value = $(this).find(".tag-color").attr('val');
                data[name] = value;
            });
            $("input[name=colors_hidden]").val($.toJSON(data));
            $(this).parents('form').submit();
        }
    });
};

$(document).ready(function() {
    backlog_handlers();
    settings_handlers();
    //$(".submit-row input").button()
});
