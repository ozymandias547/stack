// Gets all the tasks for a specific stack _id

getTasksFor = function(stackId) {
    var all = Task.find({
        stackId: stackId
    }, {
        sort: {
            priority: 1
        }
    }).fetch();

    var regExpFilter = buildRegExpFromUserFilter(Session.get('regExpFilter'));
    var allFiltered = [];
    var byStateFiltered = {};

    // Linkify and filter by regexp
    for (var i = 0; i < all.length; i++) {
        var task = all[i];
        var key = task.state !== undefined ? task.state : 0;
        byStateFiltered[key] = byStateFiltered[key] !== undefined ? byStateFiltered[key].concat([task]) : [task];
        if (regExpFilter !== undefined && !regExpFilter.test(JSON.stringify(all[i])))
            continue;

        if (regExpFilter)
            task = JSON.parse(JSON.stringify(task).replace(regExpFilter, '<div class=\'filterHighlight\'>$1</div>'));

        allFiltered.push(task);

        all[i].name = linkify(all[i].name, {
            callback: function(name, href) {
                return href ? ('<a href=\'' + href + '\' target=\'_blank\'>' + name + '</a>') : name;
            }
        });
    }

    return {
        all: all,
        allFiltered: allFiltered,
        byStateFiltered: byStateFiltered
    };
};

buildRegExpFromUserFilter = function(filter) {
    if (filter) {
        return new RegExp('(' + filter + ')', 'gi');
    }
    return undefined;
}