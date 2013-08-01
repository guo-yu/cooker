// version ctrler
var Version = {
    this.start = '0.0.1';
    this.version = this.start;
    this.divider = '-';
    this.afterfix = 'cooker';
    this.step = 10;
};

Version.prototype.update = function() {
    var self = this;
    var add = function(one) {
        if (one <= self.step) {
            one = one + 1;
            return true;
        } else {
            return false;
        }
    };
    var update = function(v) {
        var list = v.split(self.divider),
            last = list.length - 1;
        var up = function(i) {
            if (!add(list[i])) {
                i--;
                up(i);
            }
        };
        up(last);
    };
    this.version = update(this.version);
}

module.exports = Version;