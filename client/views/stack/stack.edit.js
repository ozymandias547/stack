Template.stack.events({
    "mousedown .StackEditButton": function(event, template) {
        
        var $StackTitle = $(template.find('.StackTitle'));
        var $StackDescription = $(template.find('.StackDescription'));
        var $StackEditForm = $(template.find('.StackEditForm'));

        if ($StackEditForm.is(":visible")) {
            
            $(template.find('input')).val(this.name);
            $(template.find('textarea')).val(this.description);
            $StackEditForm.addClass("hidden");
        
        } else {

            $(template.find('input')).val(this.name);
            $(template.find('textarea')).val(this.description);

            $StackDescription.addClass('hidden');
            $StackEditForm.removeClass('hidden');

            $StackEditForm.find('input').focus();
        }
       
    },
    "mousedown .StackEditSubmit": function(event, template) {
        var $StackTitle = $(template.find('.StackTitle'));
        var $StackDescription = $(template.find('.StackDescription'));
        var $StackEditForm = $(template.find('.StackEditForm'));
        var $StackEditInput = $(template.find('input'));
        var $StackEditDescTextArea = $(template.find('textarea'))

        Stack.update({
            _id: this._id
        }, {
            $set: {
                name: $StackEditInput.val(),
                description: $StackEditDescTextArea.val()
            }
        });

        $StackDescription.removeClass('hidden');
        $StackEditForm.addClass("hidden");
    },

    "mousedown .StackEditCancel": function(event, template) {
        var $StackTitle = $(template.find(".StackTitle"));
        var $StackEditForm = $(template.find(".StackEditForm"));

        $(template.find('input')).val(this.name);
        $(template.find('textarea')).val(this.description);
        $StackEditForm.addClass("hidden");
    }
});