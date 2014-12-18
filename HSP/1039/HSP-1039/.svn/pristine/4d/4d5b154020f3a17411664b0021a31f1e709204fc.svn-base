;

SNI.HGTV.LazyImage = {    
    load: function(img_element, src){
        var image_src = src || img_element.attr('data-src');
        img_element.attr('src', image_src);
        return img_element;
    }
};

SNI.HGTV.ViewSlider  = (function(){
    function ViewSlider() {
        this.updateImageList = function(){
            this.images = this.images.not('[src]');
            return this.images;
        },

        this.monitorScroll = function(){
            var sliding_window = this;
            var slider = sliding_window.slider;
            sliding_window.images = slider.find('img').not('[src]');

            if (sliding_window.images.length > 0) {
                slider.scroll(function(e){

                    sliding_window.images.each(function(i) {
                        var $this = jQuery(this);
                        
                        if (($this.offset().left - slider.offset().left) <= slider.width()) {
                            SNI.HGTV.LazyImage.load($this);
                            sliding_window.updateImageList();
                        }
                    });
                });
            }
        },

        this.calculateBodyWidth = function(slider_body){
            slider_body = slider_body || sliding_window.slider.children('ul');
            var total_body_width = 0;
            slider_body.children('li').each(function(i){
                var $this = $(this);
                var list_item_width = $this.outerWidth() + parseInt($this.css('margin-left')) + parseInt($this.css('margin-right'));
                total_body_width = total_body_width + list_item_width;
            });
            return total_body_width;
        },

        this.init = function(element){
            var sliding_window = this;
            var slider = element || jQuery('.view-slider');
            sliding_window.slider = slider;
            slider.addClass("view-slider-setup")
            sliding_window.images = slider.find('img').not('[src]');
            var slider_body = slider.children('ul');
            var slider_body_width = sliding_window.calculateBodyWidth(slider_body);

            // Set the width of the UL if it doesn't match the calculated width
            if (slider_body.width() !== slider_body_width) {
                slider_body.width(slider_body_width);
            }

            // initial image load
            sliding_window.images.each(function(i){
                var $this = jQuery(this);

                if ($this.position().left <= sliding_window.slider.width()){
                    SNI.HGTV.LazyImage.load($this);
                }
            });
            sliding_window.updateImageList();
            
            sliding_window.monitorScroll();

       //     return sliding_window;
        }
    }
    return {
        init: function(element) {
            var view_slider = new ViewSlider();
            view_slider.init(element);
            return view_slider;
        }
    };
})();
