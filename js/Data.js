
Brick.Data = {

  YARD_TO_METER: 0.9144,
  FOOT_TO_METER: 0.3048,
  INCH_TO_METER: 0.0254,

  alignTags: function(tags) {
    if (tags['building:height']) {
      tags['height'] = tags['building:height'];
      tags['building:height'] = null;
    }
    if (tags['height']) {
      tags['height'] = this.toMeters(tags['height']);
    }

    if (tags['roof:height']) {
      tags['roof:height'] = this.toMeters(tags['roof:height']);
    }

    if (tags['building'] && tags['building'] === 'yes') {
      tags['building'] = null;
    }

    if (tags['levels']) {
      tags['building:levels'] = parseInt(tags['levels'], 10);
      tags['levels'] = null;
    }
    if (tags['building:levels']) {
      tags['building:levels'] = parseInt(tags['building:levels'], 10);
    }

    if (tags['building:color']) {
      tags['building:colour'] = tags['building:color'];
      tags['building:color'] = null;
    }

    if (tags['roof:color']) {
      tags['roof:colour'] = tags['roof:color'];
      tags['roof:color'] = null;
    }

    if (tags['building:roof:color']) {
      tags['roof:colour'] = tags['building:roof:color'];
      tags['building:roof:color'] = null;
    }
    if (tags['building:roof:colour']) {
      tags['roof:colour'] = tags['building:roof:colour'];
      tags['building:roof:colour'] = null;
    }

  //  if (tags['roof:shape']) {
  //    if (tags['roof:shape'] === 'pyramidal') {
  //      tags['roof:shape'] = 'pyramid';
  //    }
  //  }

    return tags;
  },

  toMeters: function(str) {
    var value = parseFloat(str);
    if (value == str) {
      return Math.round(value);
    }
    if (~str.indexOf('m')) {
      return Math.round(value);
    }
    if (~str.indexOf('yd')) {
      return Math.round(value*YARD_TO_METER);
    }
    if (~str.indexOf('ft')) {
      return Math.round(value*FOOT_TO_METER);
    }
    if (~str.indexOf('\'')) {
//      list($foot, $inch) = str.split('\'');
      return Math.round(foot*FOOT_TO_METER + inch*INCH_TO_METER);
    }

    return Math.round(value);
  }
};
