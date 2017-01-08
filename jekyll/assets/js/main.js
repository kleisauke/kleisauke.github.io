$(document).ready(function() {
    /* show active tab on reload */
    if (location.hash !== '') {
        $('a[data-target="' + location.hash + '"]').tab('show');
    }

    /* remember the hash in the URL without jumping */
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var target;
        if ($(e.target).attr('data-target')) {
            target = $(e.target).data('target').substr(1);
            if (history.pushState) {
                history.pushState(null, null, '#' + target);
            } else {
                location.hash = '#' + target;
            }
        }
        if (target == 'portfolio') {
            setupPortfolio();
        }
    });

    var $target = $('#navbar-header ul li a.active');
    if (!$target.attr('data-target') && $target.attr('href') == 'portfolio') {
        setupPortfolio();
    }

    var $profileimg = $('.profile-image img');
    $profileimg.click(function() {
        $(this).removeClass('active');
        if ($(this).is(':last-child')) {
            $profileimg.first().addClass('active');
        } else {
            $(this).next().addClass('active');
        }
        return false;
    });

    setupContact();
});

/* PORTFOLIO FILTERING - ISOTOPE */
function setupPortfolio() {
    /* Cache container */
    var $container = $('#portfolio-items');

    if ($container.length) {
        if ($container.data('isotope')) {
            $container.isotope('layout');
        } else {
            $container.imagesLoaded(function() {
                /* Initialize isotope */
                $container.isotope({
                    itemSelector: '.item',
                    layoutMode: 'masonry'
                });

                /* filter items when filter link is clicked */
                $('#filters a').click(function() {
                    var selector = $(this).attr('data-filter');
                    $container.isotope({
                        filter: selector
                    });
                    $(this).parent().addClass('current').siblings().removeClass('current');
                    return false;
                });
            });
        }
        // jQuery Lightcase
        $('a[data-rel^=lightcase]').lightcase({
            showSequenceInfo: false,
            maxWidth: 1170,
            maxHeight: 800,
            type: 'ajax'
        });
    }
}

function setupContact() {
    /* Cache contact-form */
    var $contactForm = $('#contact-form');

    if ($contactForm.length) {
        $contactForm.validator().on('submit', function(e) {
            if (!e.isDefaultPrevented()) {
                e.preventDefault();
                $("input[type='submit']").attr("disabled", "disabled");

                grecaptcha.execute();
            }
        })

        $('.new-email, .try-again').on('click', function(e) {
            $contactForm.show();
            $(".hidden-form").hide();
        });
    }
}

function onSubmit(token) {
    /* Cache contact-form */
    var $contactForm = $('#contact-form');

    $.ajax({
        type: "POST",
        cache: false,
        url: $contactForm.attr('action'),
        data: $contactForm.serialize(),
        dataType: "json",
        success: function(data, textStatus) {
            $("input[type='submit']").removeAttr("disabled");
            if (data.status == 'success') {
                $contactForm.hide();
                $contactForm.clearForm();
                $(".hidden-form > .alert").removeClass("alert-danger").addClass("alert-success");
                $(".hidden-form > .alert").text(data.message);
                $(".try-again").hide();
                $(".new-email").show();
                $(".hidden-form").show();
            } else {
                $contactForm.hide();
                $(".hidden-form > .alert").removeClass("alert-success").addClass("alert-danger");
                $(".hidden-form > .alert").text(data.error);
                $(".try-again").show();
                $(".new-email").hide();
                $(".hidden-form").show();
            }
        }
    });
}

$.fn.clearForm = function() {
    return this.each(function() {
        var type = this.type,
            tag = this.tagName.toLowerCase();
        if (tag == 'form')
            return $(':input', this).clearForm();
        if (type == 'text' || type == 'password' || tag == 'textarea')
            this.value = '';
        else if (type == 'checkbox' || type == 'radio')
            this.checked = false;
        else if (tag == 'select')
            this.selectedIndex = -1;
    });
};
