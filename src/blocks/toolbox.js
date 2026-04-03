export const TOOLBOX = {
  kind: 'categoryToolbox',
  contents: [
    { kind:'category', name:'Canvas',   colour:'#00bcd4', contents:[
      {kind:'block',type:'ml_setup_canvas'},
      {kind:'block',type:'ml_background'},
    ]},
    { kind:'category', name:'Shapes',   colour:'#ef6c00', contents:[
      {kind:'block',type:'ml_rect'},
      {kind:'block',type:'ml_circle'},
      {kind:'block',type:'ml_ellipse'},
      {kind:'block',type:'ml_line'},
      {kind:'block',type:'ml_triangle'},
    ]},
    { kind:'category', name:'Colors',   colour:'#f9a825', contents:[
      {kind:'block',type:'ml_fill'},
      {kind:'block',type:'ml_stroke'},
      {kind:'block',type:'ml_no_stroke'},
      {kind:'block',type:'ml_no_fill'},
    ]},
    { kind:'category', name:'Motion',   colour:'#2e7d32', contents:[
      {kind:'block',type:'ml_translate'},
      {kind:'block',type:'ml_rotate'},
    ]},
    { kind:'category', name:'Mouse',    colour:'#6a1b9a', contents:[
      {kind:'block',type:'ml_mouse_x'},
      {kind:'block',type:'ml_mouse_y'},
      {kind:'block',type:'ml_if_mouse_pressed'},
    ]},
    { kind:'category', name:'Loops',    colour:'#e53935', contents:[
      {kind:'block',type:'ml_repeat'},
    ]},
    { kind:'category', name:'Text',     colour:'#c2185b', contents:[
      {kind:'block',type:'ml_text'},
      {kind:'block',type:'ml_text_size'},
    ]},
    { kind:'category', name:'Math',     colour:'#1565c0', contents:[
      {kind:'block',type:'ml_random'},
      {kind:'block',type:'ml_map'},
    ]},
    { kind:'sep' },
    { kind:'category', name:'Logic',     colour:'#5C81A6', custom:'IF' },
    { kind:'category', name:'Variables', colour:'#A65C81', custom:'VARIABLE' },
    { kind:'category', name:'Numbers',   colour:'#5C68A6', contents:[
      {kind:'block',type:'math_number'},
      {kind:'block',type:'math_arithmetic'},
      {kind:'block',type:'math_random_int'},
    ]},
    { kind:'category', name:'Strings',  colour:'#5ca65c', contents:[
      {kind:'block',type:'text'},
    ]},
  ]
}