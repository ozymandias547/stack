// Gets all the tasks for a specific stack _id

getTasksFor = function(stackId) {
    var tasks = Task.find({
        stackId: stackId,
        state: {
            $ne: 1
        }
    }, {
        sort: {
            priority: 1
        }
    }).fetch();

    var regExpFilter = buildRegExpFromUserFilter(Session.get('regExpFilter'));
    var result = [];

    // Linkify and filter by regexp
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        if (regExpFilter !== undefined && !regExpFilter.test(JSON.stringify(tasks[i])))
            continue;

        if (regExpFilter)
            task = JSON.parse(JSON.stringify(task).replace(regExpFilter, '<div class=\'filterHighlight\'>$1</div>'));

        result.push(task);

        tasks[i].name = linkify(tasks[i].name, {
            callback: function(name, href) {
                return href ? ('<a href=\'' + href + '\' target=\'_blank\'>' + name + '</a>') : name;
            }
        });
    }

    return {
        all: tasks,
        filtered: result
    };
};

buildRegExpFromUserFilter = function(filter) {
    if (filter) {
        return new RegExp('(' + filter + ')', 'gi');
    }
    return undefined;
}