Template.stack.events({
    "click .StackEditButton": function(event, template) {
        var $StackTitle = $(template.find('.StackTitle'));
        var $StackDescription = $(template.find('.StackDescription'));
        var $StackEditForm = $(template.find('.StackEditForm'));

        $(template.find('input')).val(this.name);
        $(template.find('textarea')).val(this.description);

        $StackTitle.addClass('hidden');
        $StackDescription.addClass('hidden');
        $StackEditForm.removeClass('hidden');

        $StackEditForm.find('input').focus();
    },
    "click .StackEditSubmit": function(event, template) {
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

        $StackTitle.removeClass('hidden');
        $StackDescription.removeClass('hidden');
        $StackEditForm.addClass("hidden");
    },

    "click .StackEditCancel": function(event, template) {
        var $StackTitle = $(template.find(".StackTitle"));
        var $StackEditForm = $(template.find(".StackEditForm"));

        $(template.find('input')).val(this.name);
        $(template.find('textarea')).val(this.description);
        $StackTitle.removeClass("hidden");
        $StackEditForm.addClass("hidden");
    }
});