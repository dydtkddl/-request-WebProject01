/* ************************************ */
/* Define helper functions */
/* ************************************ */
// 두 개의 <div> 요소가 순차적으로 <body> 안에 추가되며 display_stage가 클래스인 div를 반환
function getDisplayElement() {
  // jQuery를 사용해 새로운 <div> 요소를 생성
  // 그리고 HTML 문서의 <body> 태그 안에 추가.
  $('<div class = display_stage_background></div>').appendTo('body')
  // $('<div class = display_stage></div>'): 클래스 이름이 display_stage인 또 다른 빈 <div> 요소를 생성
  // 그리고 body태그안에 추가
  //그리고 그 div를 반환
  return $('<div class = display_stage></div>').appendTo('body')
}

// 주어진 값(value)으로 길이(len)의 배열을 생성하는 함수
function fillArray(value, len) {
  // 길이가 0일 경우, 빈 배열을 반환
  if (len === 0) return [];

  // 배열 a를 value로 초기화된 배열로 설정
  var a = [value];

  // 배열 a의 길이가 len의 절반 이하일 동안 배열 a를 자신과 합쳐서 배열의 크기를 두 배로 증가시킴
  while (a.length * 2 <= len) a = a.concat(a);

  // 배열 a의 길이가 목표 길이(len)에 도달하지 않았을 경우, 남은 부분만큼 다시 추가함
  // 남은 길이(len - a.length)만큼 배열 a의 앞부분을 잘라서 추가
  if (a.length < len) a = a.concat(a.slice(0, len - a.length));

  // 완성된 배열을 반환
  return a;
}

// 함수 getInstructFeedback: feedback_instruct_text 변수를 포함하는 HTML 문자열을 반환
var getInstructFeedback = function() {
  // 'centerbox' 클래스를 가진 <div> 요소와 'center-block-text' 클래스를 가진 <p> 요소를 생성하고,
  // 그 안에 feedback_instruct_text 변수를 포함시켜 반환
  return '<div class = centerbox><p class = center-block-text>' + feedback_instruct_text +
    '</p></div>';
}

// 함수 getPracticeInstruct: practice_feedback_text 변수를 포함하는 HTML 문자열을 반환
var getPracticeInstruct = function() {
  // 'centerbox' 클래스를 가진 <div> 요소와 'center-block-text' 클래스를 가진 <p> 요소를 생성하고,
  // 그 안에 practice_feedback_text 변수를 포함시켜 반환
  return '<div class = centerbox><p class = center-block-text>' + practice_feedback_text +
    '</p></div>';
}


/* ************************************ */
/* Define experimental variables */
/* ************************************ */
var run_attention_checks = true  // 주의력 확인을 실행할지 여부를 설정하는 변수 (true로 설정 시 실행됨)
var attention_check_thresh = 0.65  // 주의력 확인 통과를 위한 임계값(65% 이상 통과해야 함)
var sumInstructTime = 0  // 설명을 읽는 데 걸린 시간의 총합 (밀리초 단위)  //ms
var instructTimeThresh = 0  // 설명을 읽는 데 필요한 ///in seconds

var path = './images/' // 이미지 파일들이 저장된 경로를 나타내는 변수
var prefix = '<div><img src = "' // 각 이미지 태그의 시작 부분을 담은 HTML 문자열 (이미지 태그의 시작을 정의)
var bottom_id = '" id="bottom_img'  // 이미지의 id 속성을 정의하는 문자열 (bottom_img라는 id를 지정)
var postfix = '"</img></div>' // 이미지 태그의 끝 부분을 담은 HTML 문자열 (이미지 태그와 div의 끝을 정의)
var top_img = ['top_1.jpg', 'top_2.jpg', 'top_3.jpg', 'top_4.jpg', 'top_5.jpg', 'top_6.jpg',
  'top_7.jpg', 'top_8.jpg', 'top_9.jpg', 'top_10.jpg', 'top_11.jpg', 'top_12.jpg', 'top_13.jpg',
  'top_14.jpg', 'top_15.jpg', 'top_16.jpg', 'top_17.jpg', 'top_18.jpg'
]
var bottom_img = ['bottom_1.jpg', 'bottom_2.jpg', 'bottom_3.jpg', 'bottom_4.jpg', 'bottom_5.jpg',
  'bottom_6.jpg', 'bottom_7.jpg', 'bottom_8.jpg', 'bottom_9.jpg', 'bottom_10.jpg',
  'bottom_11.jpg', 'bottom_12.jpg', 'bottom_13.jpg', 'bottom_14.jpg', 'bottom_15.jpg',
  'bottom_16.jpg', 'bottom_17.jpg', 'bottom_18.jpg'
] // top 이미지 파일들의 이름을 저장한 배열 (총 18개의 이미지 파일 이름을 담고 있음)
// bottom 이미지 파일들의 이름을 저장한 배열 (총 18개의 이미지 파일 이름을 담고 있음)
var practice_tries = 0// 연습 문제의 시도 횟수를 저장하는 변수 (처음에는 0으로 설정)
var practice_thresh = 5  // 연습 문제의 최대 허용 시도 횟수 (5번까지 시도 가능)
let all_pages = []   // 각 문제의 이미지 페이지들을 저장할 빈 배열

// top_img 라는 어레이의 길이만큼 반복
for (var i = 0; i < top_img.length; i++) {
  var page = [] // 완전체 이미지 HTML코드조각을 넣을
  page.push(prefix + path + top_img[i] + postfix + prefix + path + bottom_img[i] + bottom_id +
    postfix)
  all_pages.push(page)
}

var opts = ["A", "B", "C", "D", "E", "F", "G", "H"]

// ["A", "B", "C", "D", "E", "F", "G", "H"]라는 내부 어레이가 18개 있는 이중어레이 생성
var all_options = fillArray([opts], 18)

var scale_q1 = {
  "A": 0,
  "B": 1,
  "C": 0,
  "D": 0,
  "E": 0,
  "F": 0,
  "G": 0,
  "H": 0
}
var scale_q2 = {
  "A": 0,
  "B": 0,
  "C": 0,
  "D": 0,
  "E": 1,
  "F": 0,
  "G": 0,
  "H": 0
}
var scale_q3 = {
  "A": 0,
  "B": 0,
  "C": 0,
  "D": 0,
  "E": 0,
  "F": 0,
  "G": 1,
  "H": 0
}
var scale_q4 = {
  "A": 0,
  "B": 1,
  "C": 0,
  "D": 0,
  "E": 0,
  "F": 0,
  "G": 0,
  "H": 0
}
var scale_q5 = {
  "A": 0,
  "B": 0,
  "C": 1,
  "D": 0,
  "E": 0,
  "F": 0,
  "G": 0,
  "H": 0
}
var scale_q6 = {
  "A": 0,
  "B": 1,
  "C": 0,
  "D": 0,
  "E": 0,
  "F": 0,
  "G": 0,
  "H": 0
}
var scale_q7 = {
  "A": 0,
  "B": 0,
  "C": 0,
  "D": 0,
  "E": 1,
  "F": 0,
  "G": 0,
  "H": 0
}
var scale_q8 = {
  "A": 0,
  "B": 1,
  "C": 0,
  "D": 0,
  "E": 0,
  "F": 0,
  "G": 0,
  "H": 0
}
var scale_q9 = {
  "A": 0,
  "B": 1,
  "C": 0,
  "D": 0,
  "E": 0,
  "F": 0,
  "G": 0,
  "H": 0
}
var scale_q10 = {
  "A": 0,
  "B": 0,
  "C": 0,
  "D": 0,
  "E": 1,
  "F": 0,
  "G": 0,
  "H": 0
}
var scale_q11 = {
  "A": 1,
  "B": 0,
  "C": 0,
  "D": 0,
  "E": 0,
  "F": 0,
  "G": 0,
  "H": 0
}
var scale_q12 = {
  "A": 0,
  "B": 0,
  "C": 0,
  "D": 0,
  "E": 1,
  "F": 0,
  "G": 0,
  "H": 0
}
var scale_q13 = {
  "A": 1,
  "B": 0,
  "C": 0,
  "D": 0,
  "E": 0,
  "F": 0,
  "G": 0,
  "H": 0
}
var scale_q14 = {
  "A": 0,
  "B": 0,
  "C": 1,
  "D": 0,
  "E": 0,
  "F": 0,
  "G": 0,
  "H": 0
}
var scale_q15 = {
  "A": 0,
  "B": 1,
  "C": 0,
  "D": 0,
  "E": 0,
  "F": 0,
  "G": 0,
  "H": 0
}
var scale_q16 = {
  "A": 0,
  "B": 0,
  "C": 0,
  "D": 0,
  "E": 1,
  "F": 0,
  "G": 0,
  "H": 0
}
var scale_q17 = {
  "A": 0,
  "B": 0,
  "C": 0,
  "D": 0,
  "E": 0,
  "F": 1,
  "G": 0,
  "H": 0
}
var scale_q18 = {
  "A": 0,
  "B": 0,
  "C": 0,
  "D": 1,
  "E": 0,
  "F": 0,
  "G": 0,
  "H": 0
}

var score_scale = [
  [scale_q1],
  [scale_q2],
  [scale_q3],
  [scale_q4],
  [scale_q5],
  [scale_q6],
  [scale_q7],
  [scale_q8],
  [scale_q9],
  [scale_q10],
  [scale_q11],
  [scale_q12],
  [scale_q13],
  [scale_q14],
  [scale_q15],
  [scale_q16],
  [scale_q17],
  [scale_q18]
]
/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */

/* define static blocks */

var feedback_instruct_text =
  '연구에 참여해 주셔서 감사합니다.<br><br> 계속하려면 <strong>enter</strong> 키를 누르세요.'
var feedback_instruct_block = {
  type: 'poldrack-text',
  cont_key: [13],
  text: getInstructFeedback,
  timing_post_trial: 0,
  timing_response: 180000,
  data: {
    exp_id: "ravens"
  }
};
/// This ensures that the subject does not read through the instructions too quickly.  If they do it too quickly, then we will go over the loop again.
var instructions_block = {
  type: 'poldrack-instructions',
  pages: [
    '<div class = centerbox><p class = block-text>이 테스트는 관찰력, 집중력, 사고력을 평가하는 시험이며 18개 문제로 이루어져 있습니다. 각 문제에는 일정한 패턴을 가진 그림이 제시되어 있습니다. 여러분의 역할은 패턴을 파악하여 빈칸을 완성하는 것입니다. 8가지 선택지 중에서 빈칸에 들어갈 그림으로 적절한 것을 고르세요.<br><br>‘Next’ 버튼을 누르면 예시 문제가 제시됩니다.</p></div>',
    '<div class = centerbox><p class = block-text><strong>예시 문제의 패턴을 살펴봅시다.</strong> 행(가로)을 따라가면 선의 개수가 동일합니다. 열(세로)을 따라가면 사각형의 개수가 동일합니다.<div class="sample_img"><img src = "./images/practice/sample_matrix_top.jpg"</img></div><p class= "block-text"><strong>예시 문제의 선택지를 살펴봅시다.</strong> 빈칸에 들어갈 가장 적절한 답은 ‘E’입니다.</p><div class="sample_img"><img src = "./images/practice/sample_matrix_bottom.jpg" id="bottom_img"</img></div><div class="sample_img"><img src = "./images/practice/Opt_E_selected.png"</img></div></p></div>',
    '<div class = centerbox><p class = center-block-text>이제 다음 페이지에서는 연습 문제 2개를 풀어보겠습니다. 연습 문제에는 정답/오답 여부가 제시되며, 다시 풀 수 있습니다. 실제 문제에는 정답/오답 여부가 제시되지 않습니다.</p></div>'
  ],
  allow_keys: false,
  show_clickable_nav: true,
  timing_post_trial: 1000,
  data: {
    exp_id: "ravens"
  }
};

var instruction_node = {
  timeline: [feedback_instruct_block, instructions_block],
  /* This function defines stopping criteria */
  loop_function: function(data) {
    for (i = 0; i < data.length; i++) {
      if ((data[i].trial_type == 'poldrack-instructions') && (data[i].rt != -1)) {
        rt = data[i].rt
        sumInstructTime = sumInstructTime + rt
      }
    }
    if (sumInstructTime <= instructTimeThresh * 1000) {
      feedback_instruct_text =
        '시간을 충분히 가지고 읽어보세요. 설명의 내용을 이해하고 넘어가길 바랍니다.  계속하려면 <strong>enter</strong> 키를 누르세요.'
      return true
    } else if (sumInstructTime > instructTimeThresh * 1000) {
      feedback_instruct_text =
        '설명이 종료되었습니다. 계속하려면 <strong>enter</strong> 키를 누르세요.'
      return false
    }
  }
}



var practice_feedback_text =
  '첫 번째 연습 문제입니다. 계속하려면 <strong>enter</strong> 키를 눌러주세요.'
var practice_feedback_block = {
  type: 'poldrack-text',
  cont_key: [13],
  text: getPracticeInstruct,
  timing_post_trial: 0,
  timing_response: 180000,
  data: {
    exp_id: "ravens",
    exp_stage: 'practice',
    trial_id: 'feedback'
  }
};

var practice_trials_1 = []
var practice_block_1 = {
  type: "poldrack-survey-multi-choice",
  exp_id: "ravens",
  horizontal: true,
  preamble: '',
  pages: [
    [
      '<div><img src = "./images/practice/practice_top_1.jpg"</img></div><div><img src = "./images/practice/practice_bottom_1.jpg" id="bottom_img"</img></div>'
    ]
  ],
  options: [
    [
      ["A", "B", "C", "D", "E", "F", "G", "H"]
    ]
  ],
  scale: [
    [{
      "A": 0,
      "B": 0,
      "C": 1,
      "D": 0,
      "E": 0,
      "F": 0,
      "G": 0,
      "H": 0
    }]
  ],
  show_clickable_nav: true,
  allow_backward: true,
  required: [
    [
      [true]
    ]
  ],
};


var practice_node_1 = {
  timeline: [practice_feedback_block, practice_block_1],
  /* This function defines stopping criteria */
  loop_function: function(data) {
    practice_tries += 1
    //here it should check if the answer to the question is correct
    for (var i = 0; i < data.length; i++) {
      if ((data[i].trial_type == 'poldrack-survey-multi-choice') && (data[i].score_response !=
          1)) {
        practice_feedback_text = '오답입니다. 다시 시도하려면 <strong>enter</strong> 키를 누르세요.'
        return true
      } else if ((data[i].trial_type == 'poldrack-survey-multi-choice') && (data[i].score_response ==
          1)) {
        practice_tries = 0
        practice_feedback_text = '정답입니다. 계속하려면 <strong>enter</strong> 키를 누르세요.'
        return false
      } else if (practice_tries > practice_thresh) {
        practice_tries = 0
        practice_feedback_text = "오답이지만, 다음으로 넘어가겠습니다. 계속하려면 <strong>Enter</strong> 키를 누르세요."
        return false
      }
    }
  }
}

var practice_trials_2 = []
var practice_block_2 = {
  type: "poldrack-survey-multi-choice",
  exp_id: "ravens",
  horizontal: true,
  preamble: '',
  pages: [
    [
      '<div><img src = "./images/practice/practice_top_2.jpg"</img></div><div><img src = "./images/practice/practice_bottom_2.jpg" id="bottom_img"</img></div>'
    ]
  ],
  options: [
    [
      ["A", "B", "C", "D", "E", "F", "G", "H"]
    ]
  ],
  scale: [
    [{
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0,
      "E": 0,
      "F": 1,
      "G": 0,
      "H": 0
    }]
  ],
  show_clickable_nav: true,
  allow_backward: true,
  required: [
    [
      [true]
    ]
  ],
};


var practice_node_2 = {
  timeline: [practice_feedback_block, practice_block_2],
  /* This function defines stopping criteria */
  loop_function: function(data) {
    practice_tries += 1
    //here it should check if the answer to the question is correct
    for (var i = 0; i < data.length; i++) {
      if ((data[i].trial_type == 'poldrack-survey-multi-choice') && (data[i].score_response !=
          1)) {
        practice_feedback_text = '오답입니다. 다시 시도하려면 <strong>enter</strong> 키를 누르세요.'
        return true
      } else if ((data[i].trial_type == 'poldrack-survey-multi-choice') && (data[i].score_response ==
          1)) {
        practice_feedback_text = '정답입니다. 계속하려면 <strong>enter</strong> 키를 누르세요.'
        practice_tries = 0
        return false
      } else if (practice_tries > practice_thresh) {
        practice_feedback_text = "오답이지만, 다음으로 넘어가겠습니다. 계속하려면 <strong>Enter</strong> 키를 누르세요."
        practice_tries = 0
        return false
      }
    }
  }
}

var start_test_block = {
  type: 'poldrack-text',
  cont_key: [13],
  text: '<div class = centerbox><p class = center-block-text>이제 실제 문제를 풀 것입니다.<br><br>계속하려면 <strong>enter</strong> 키를 누르세요.</p></div>',
  timing_post_trial: 0,
  timing_response: 180000,
  data: {
    exp_id: "ravens"
  }
};

var survey_block = {
  type: "poldrack-survey-multi-choice",
  exp_id: "ravens",
  horizontal: true,
  preamble: '',
  pages: all_pages,
  options: all_options,
  scale: score_scale,
  show_clickable_nav: true,
  allow_backward: true,
  required: fillArray([true], 18),
};

var end_block = {
  type: 'text',
  text: '<div class = centerbox><p class = center-block-text>수고하셨습니다. 모든 문제를 다 푸셨습니다.</p><p class = center-block-text>계속하려면 <strong>enter</strong> 키를 누르세요.</p></div>',
  cont_key: [13],
  data: {
    exp_id: "ravens"
  }
};


//Set up experiment
var ravens_experiment = []
ravens_experiment.push(instruction_node);
ravens_experiment.push(practice_node_1);
ravens_experiment.push(practice_feedback_block)
ravens_experiment.push(practice_node_2);
ravens_experiment.push(practice_feedback_block)
ravens_experiment.push(start_test_block);
ravens_experiment.push(survey_block);
ravens_experiment.push(end_block);


