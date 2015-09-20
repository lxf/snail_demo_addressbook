
//jQuery mthod extend

(function ($) {

    // Extend jquery object method
    $.fn.extend({
        // Extend jquery 'realVal' method
        realVal: function () {
            var tagType = (this.attr("type") || "").toUpperCase();
            var tagName = this.prop("tagName").toUpperCase();

            if ((tagName === "INPUT") && (tagType === "CHECKBOX" || tagType === "RADIO")) {
                return this.prop("checked");
            }
            if (this.attr("data-value")) {
                return this.attr("data-value");
            }

            return this.val();
        },

        // Get tag object value
        getVal: function () {
            var tagType;
            var tagName = this.prop("tagName").toUpperCase();

            if (tagName === "SELECT") {
                return this.val();
            }
            if (tagName === "SPAN" || tagName === "LABEL" || tagName === "TEXTAREA") {
                return this.text();
            }
            if (tagName === "INPUT") {
                tagType = this.attr("type").toUpperCase();
                if (tagType === "TEXT" || tagType === "HIDDEN") {
                    return this.val();
                }
                if (tagType === "CHECKBOX" || tagType === "RADIO") {
                    return this.prop("checked");
                }
            }
        },

        // Set tag object value
        setVal: function (value) {
            var tagType;
            var tagName = this.prop("tagName").toUpperCase();

            if (tagName === "SELECT") {
                this.val(value);
            }
            if (tagName === "SPAN" || tagName === "LABEL" || tagName === "TEXTAREA") {
                this.text(value);
            }
            if (tagName === "INPUT") {
                tagType = this.attr("type").toUpperCase();
                if (tagType === "TEXT" || tagType === "HIDDEN") {
                    return this.val(value);
                }
                if (tagType === "CHECKBOX" || tagType === "RADIO") {
                    this.attr("checked", value);
                }
            }
        },

        // Clear tag object value
        clearVal: function () {
            var tagType;
            var tagName = this.prop("tagName").toUpperCase();

            if (tagName === "SELECT") {
                this.get(0).selectedIndex = 0;
            }
            if (tagName === "SPAN" || tagName === "LABEL" || tagName === "TEXTAREA") {
                this.text("");
            }
            if (tagName === "INPUT") {
                tagType = this.attr("type").toUpperCase();
                if (tagType === "TEXT" || tagType === "HIDDEN") {
                    return this.val("");
                }
                if (tagType === "CHECKBOX" || tagType === "RADIO") {
                    this.attr("checked", false);
                }
            }
        },

        // Extend jquery 'shop tip' method
        showTip: function () {
            var tip = this.data("tip");
            var p = this.offset();
            var h = (24 - this.outerHeight()) / 2;
            var top = parseInt(p.top) - h;
            var left = parseInt(p.left) + parseInt(this.outerWidth()) + 8;

            var html = '<div id="edit-validate-tip" class="tip-message">' +
                            '<span class="tip-message_head"></span>' +
                            '<label class="tip-message_body">' + tip + '</label>' +
                            '<span  class="tip-message_foot"></span>' +
                       '</div>';

            var $tipMessage = $(html).css({
                "top": top + "px",
                "left": left + "px"
            });

            $(document.body).append($tipMessage);

            return this;
        },

        // Extend jquery 'hide tip' method
        hideTip: function () {
            $("#edit-validate-tip").remove();

            return this;
        },

        // Show msg
        showMsg: function (msg, type) {
            var $self = this, html;

            switch (type) {
                case "success":
                    html = '<b class="message-success">' + msg + '</b>';
                    break;
                case "failed":
                    html = '<b class="message-failed">' + msg + '</b>';
                    break;
                default:
                    break;
            }

            $self.append(html).show();

            setTimeout(function () {
                $self.fadeOut().find("b").remove();
            }, 3000);
        },

        // Hide msg
        hideMsg: function () {
            this.find("b").remove();
        },

        currencyFormat: function () {
            this.each(function (i) {
                $(this).change(function (e) {
                    if (isNaN(parseFloat(this.value))) return;
                    this.value = parseFloat(this.value).toFixed(2);
                });
            });
            return this; //for chaining
        }


    });

    // Extend jquery 'mappingJSON' function
    $.extend({

        /** "mappingJSON"
        * data: need to mapping of the original data
        * rule: mapping rule
        * container: store mapping after data
        **/
        mappingJSON: function (data, rule, container) {

            for (var i = 0; i < data.length; i++) {
                var temp = {};
                var item = data[i];

                for (var key in item) {
                    var newKey = rule[key] || key;

                    if ($.type(item[key]) === "array" && item[key].length > 0) {
                        temp[newKey] = [];
                        this.mappingJSON(item[key], rule, temp[newKey]);
                    } else {
                        temp[newKey] = item[key];
                    }
                }
                container.push(temp);
            }

            return container;
        },

        /** "escapeSpecialChars"
        * str: need to convert char
        **/
        escapeSpecialChars: function (str) {
            return str.replace(/[\\]/g, '\\\\');
        },

        // Build josn path
        buildJSONPath: function (data, path, container) {
            var node, temp;

            for (var i = 0; i < data.length; i++) {
                node = data[i], temp = {};
                for (var key in node) temp[key] = node[key];
                temp.Children = [];
                temp.path = (path.length === 0) ? i.toString() : path + '-' + i;

                if ("Children" in node && node.Children.length > 0)
                    this.buildJSONPath(node.Children, temp.path, temp.Children);

                container.push(temp);
            }

            return container;
        },

        // Validate is integer
        isInteger: function (val) {
            return /^[1-9]*[1-9][0-9]*$/.test(val);
        },

        // Validate is float
        isFloat: function (val, decimalLength) {
            decimalLength = decimalLength || "1";

            var pattern = "^-?\\d+(\\.\\d{1," + decimalLength + "})$";

            return (new RegExp(pattern)).test(val);
        },

        // Get url parameter
        getParameterByName: function (name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(window.location.search);
            if (results == null)
                return "";
            else
                return decodeURIComponent(results[1].replace(/\+/g, " "));
        }

    });

})(jQuery);


