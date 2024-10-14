/* ************************************ */
/* Define helper functions */
/* ************************************ */
function getDisplayElement() {
  $('<div class = display_stage_background></div>').appendTo('body')
  return $('<div class = display_stage></div>').appendTo('body')
}

function fillArray(value, len) {
  if (len === 0) return [];
  var a = [value];
  while (a.length * 2 <= len) a = a.concat(a);
  if (a.length < len) a = a.concat(a.slice(0, len - a.length));
  return a;
}

var getInstructFeedback = function() {
  return '<div class = centerbox><p class = center-block-text>' + feedback_instruct_text +
    '</p></div>'
}

var getPracticeInstruct = function() {
  return '<div class="centerbox" style="font-family: Pretendard-Regular; font-size: 24px; line-height: 2.3rem; text-align : center">' +
    '<p class="center-block-text" style="text-align: center; font-weight: 600; color: blue;">' + 
    practice_feedback_text + '</p></div>';
};

/* ************************************ */
/* Define experimental variables */
/* ************************************ */
var run_attention_checks = true
var attention_check_thresh = 0.65
var sumInstructTime = 0 //ms
var instructTimeThresh = 0 ///in seconds

var path = './images/'
var prefix = '<div style="text-align:center"><img src = "'
var bottom_id = '" id="bottom_img'
var postfix = '"</img></div>'
var top_img = ['top_1.jpg', 'top_2.jpg', 'top_3.jpg', 'top_4.jpg', 'top_5.jpg', 'top_6.jpg',
  'top_7.jpg', 'top_8.jpg', 'top_9.jpg', 'top_10.jpg', 'top_11.jpg', 'top_12.jpg', 'top_13.jpg',
  'top_14.jpg', 'top_15.jpg', 'top_16.jpg', 'top_17.jpg', 'top_18.jpg'
]
var bottom_img = ['bottom_1.jpg', 'bottom_2.jpg', 'bottom_3.jpg', 'bottom_4.jpg', 'bottom_5.jpg',
  'bottom_6.jpg', 'bottom_7.jpg', 'bottom_8.jpg', 'bottom_9.jpg', 'bottom_10.jpg',
  'bottom_11.jpg', 'bottom_12.jpg', 'bottom_13.jpg', 'bottom_14.jpg', 'bottom_15.jpg',
  'bottom_16.jpg', 'bottom_17.jpg', 'bottom_18.jpg'
]
var practice_tries = 0
var practice_thresh = 5

var all_pages = []
for (var i = 0; i < top_img.length; i++) {
  var page = []
  page.push(prefix + path + top_img[i] + postfix + prefix + path + bottom_img[i] + bottom_id +
    postfix)
    all_pages.push(page)
  }
  console.log(all_pages)

var opts = ["A", "B", "C", "D", "E", "F", "G", "H"]

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
  '<div style="text-align: center; font-size: 24px; font-weight: 400; line-height: 2.5rem; color: #333; padding: 20px;">' + 
  '연구에 참여해 주셔서 감사합니다.<br><br>' + 
  '계속하려면 <strong style="color: #007BFF; font-size: 26px;">enter</strong> 키를 누르세요.' +
  '</div>';

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
var instructions_block = {
  type: 'poldrack-instructions',
  pages: [
    // 첫 번째 페이지: 테스트 소개
    '<div class="centerbox">' + 
    '<p class="block-text" style="font-size: 24px; font-weight: 400; line-height: 2.3rem;">이 테스트는 <strong>관찰력</strong>, <strong>집중력</strong>, <strong>사고력</strong>을 평가하는 시험이며, 18개 문제로 이루어져 있습니다.</p>' + 
    '<p class="block-text" style="font-size: 24px; font-weight: 400; line-height: 2.3rem;">각 문제에는 일정한 패턴을 가진 그림이 제시되어 있습니다. 여러분의 역할은 패턴을 파악하여 빈칸을 완성하는 것입니다. 8가지 선택지 중에서 빈칸에 들어갈 그림으로 적절한 것을 고르세요.</p>' + 
    '<p class="block-text" style="font-size: 24px; font-weight: 400; line-height: 2.3rem; color: #007bff;">‘다음’ 버튼을 누르면 예시 문제가 제시됩니다.</p>' + 
    '</div>',

    // 두 번째 페이지: 예시 문제 설명
    '<div class="centerbox">' + 
    '<p class="block-text" style="font-size: 24px; font-weight: 400; line-height: 2.3rem;"><strong>예시 문제의 패턴을 살펴봅시다.</strong> 행(가로)을 따라가면 선의 개수가 동일합니다. 열(세로)을 따라가면 사각형의 개수가 동일합니다.</p>' + 
    '<div class="sample_img"><img src = "./images/practice/1.jpg"></div>' + 
    '<p class="block-text" style="font-size: 24px; font-weight: 400; line-height: 2.3rem;"><strong>예시 문제의 선택지를 살펴봅시다.</strong> 빈칸에 들어갈 가장 적절한 답은 ‘E’입니다.</p>' + 
    '<div class="sample_img"><img src = "./images/practice/2.jpg" id="bottom_img"></div>' + 
    '<div class="sample_img"><img src = "./images/practice/3.png"></div>' + 
    '</div>',

    // 세 번째 페이지: 연습 문제 안내
    '<div class="centerbox">' + 
    '<p class="center-block-text" style="font-size: 24px; font-weight: 400; line-height: 2.3rem;">이제 다음 페이지에서는 연습 문제 2개를 풀어보겠습니다. 연습 문제에는 정답/오답 여부가 제시되며, 다시 풀 수 있습니다. 실제 문제에는 정답/오답 여부가 제시되지 않습니다.</p>' + 
    '</div>'
  ],
  allow_keys: false,
  show_clickable_nav: true,
  timing_post_trial: 500,  // 이거때문에 1초 뒤에 보임
  data: {
    exp_id: "ravens"
  },
  button_label_finish: '다음' // '종료' 버튼의 레이블을 '다음'으로 변경
};

var instruction_node = {
  timeline: [feedback_instruct_block, instructions_block],
  /* This function defines stopping criteria */
  loop_function: function(data) {
    for (i = 0; i < data.length; i++) {
      if ((data[i].trial_type == 'poldrack-instructions') && (data[i].rt != -1)) {
        rt = data[i].rt;
        sumInstructTime = sumInstructTime + rt;
      }
    }
    if (sumInstructTime <= instructTimeThresh * 1000) {
      feedback_instruct_text = 
        '<p style="font-size: 24px; font-weight: 400; line-height: 2.3rem; color: #FF5733;">시간을 충분히 가지고 읽어보세요.</p>' + 
        '<p style="font-size: 24px; font-weight: 400; line-height: 2.3rem;">설명의 내용을 이해하고 넘어가길 바랍니다.</p>' +
        '<p style="font-size: 24px; font-weight: 600; line-height: 2.3rem;">계속하려면 <strong style="color: #007bff;">enter</strong> 키를 누르세요.</p>';
      return true;
    } else if (sumInstructTime > instructTimeThresh * 1000) {
      feedback_instruct_text = 
        '<p style="font-size: 24px; font-weight: 400; line-height: 2.3rem; color: #28A745;">설명이 종료되었습니다.</p>' +
        '<p style="font-size: 24px; font-weight: 600; line-height: 2.3rem;">계속하려면 <strong style="color: #007bff;">enter</strong> 키를 누르세요.</p>';
      return false;
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
  horizontal: true, //trial.horizontal: 응답 옵션을 수평으로 표시할지 여부를 결정하는 속성으로, 기본값은 false입니다.
  required: [
    [
      [true] // trial.required: 각 질문에 대해 필수 응답 여부를 설정하며, 기본값은 null입니다.
    ]
  ],
  preamble: '', // // trial.preamble: 설문 시작 전에 표시될 안내문을 설정하며, 정의되지 않았을 경우 빈 문자열로 기본값을 설정합니다.

  
  exp_id: "ravens",
  pages: [
    [
      '<div><p class = block-text></p> <div class="sample_img"><img src = "./images/practice/practice_top_1.jpg"</img></div><div class="sample_img"><img src = "./images/practice/practice_bottom_1.jpg" id="bottom_img"</img></div></div>'
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
        practice_feedback_text = '<p style="font-size: 50px; color: red;"><strong>오답입니다.</strong></p> 다시 시도하려면 <strong>enter</strong> 키를 누르세요.'
        return true
      } else if ((data[i].trial_type == 'poldrack-survey-multi-choice') && (data[i].score_response ==
          1)) {
        practice_tries = 0
        practice_feedback_text = '<p style="font-size: 50px; color: green;"><strong>정답입니다.</strong></p> 계속하려면 <strong>enter</strong> 키를 누르세요.';

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
      '<div><p class = block-text></p> <div class="sample_img"><img src = "./images/practice/practice_top_2.jpg"</img></div><div class="sample_img"><img src = "./images/practice/practice_bottom_2.jpg" id="bottom_img"</img></div></div>'

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
        // practice_feedback_text = '오답입니다. 다시 시도하려면 <strong>enter</strong> 키를 누르세요.'
        practice_feedback_text = '<p style="font-size: 50px; color: red;"><strong>오답입니다.</strong></p> 다시 시도하려면 <strong>enter</strong> 키를 누르세요.'

        return true
      } else if ((data[i].trial_type == 'poldrack-survey-multi-choice') && (data[i].score_response ==
          1)) {
        practice_feedback_text = '<p style="font-size: 50px; color: green;"><strong>정답입니다.</strong></p> 계속하려면 <strong>enter</strong> 키를 누르세요.';

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

var survey_block = [];
// for (let i = 0; i < all_pages.length; i++) {
for (let i = 0; i < 2; i++) {
  // i는 0부터 all_pages.length - 1까지 반복됩니다.
  survey_block.push({
    type: "poldrack-survey-multi-choice",
    exp_id: "ravens",
    horizontal: true,
    preamble: '',
    pages: [all_pages[i]],  // 한 페이지에 한 질문씩
    options: [all_options[i]],
    scale: score_scale,
    show_clickable_nav: true,
    allow_backward: true,
    required: fillArray([true], 18),  // 필요시 수정
  });
}

var end_block = {
  type: 'poldrack-text',
  text: '<div class = centerbox><p class = center-block-text>수고하셨습니다. 모든 문제를 다 푸셨습니다.</p><p class = center-block-text>계속하려면 <strong>enter</strong> 키를 누르세요.</p></div>',
  cont_key: [13],
  data: {
    exp_id: "ravens"
  },
  iscsv : 1
};






// 빨간 글씨 (A0 또는 A-)와 파란 글씨(난수)를 조건에 따라 설정
var redText = Math.random() < 0.5 ? 'A0' : 'A-';  // A0와 A- 중 하나를 랜덤하게 선택

var blueText;
if (redText === 'A0') {
  // 빨간 글씨가 A0이면 6.0 ~ 12.0 중 난수 생성
  blueText = (Math.random() * (12.0 - 6.0) + 6.0).toFixed(1);
} else {
  // 빨간 글씨가 A-이면 12.1 ~ 17.9 중 난수 생성
  blueText = (Math.random() * (17.9 - 12.1) + 12.1).toFixed(1);
}

var result_block_1 = {
  type: 'poldrack-instructions', // poldrack-instructions 플러그인을 사용하여 결과 페이지 생성
  pages: [
    // 결과 페이지의 내용
    '<div class="centerbox" style="line-height: 1.8; width : 600px">' +  // line-height를 사용하여 줄 간격을 늘림
    '<p class="block-text" style = "line-height : 2.5rem; font-weight : 600">' + 
    '이번 테스트에서 당신의 등급은 <strong style="color: red; font-size: 26px; text-decoration: underline;">' + redText + '</strong> (으)로, <br>' +  // 선택된 빨간 글씨 적용
    '본 과제에 응시한 전체 고등학생 집단에서 상위 <strong style="color: blue; font-size: 26px; text-decoration: underline;">' + blueText + '%</strong>에 속하며,' +  // 선택된 파란 글씨 적용
    '이는 매우 훌륭한 결과입니다.</p></div>',

  ],
  allow_keys: false,  // 키 입력 허용 여부 설정
  show_clickable_nav: true,  // 클릭 가능한 네비게이션 버튼 표시
  button_label_finish: '종료',  // 버튼 레이블을 '종료'로 설정
  timing_post_trial: 0,  // 트라이얼이 끝난 후 지연 시간 설정
  data: {
    exp_id: "ravens"  // 실험 ID
  },
};







// 빨간 글씨 (A0 또는 A-)를 조건에 따라 설정
var redText = Math.random() < 0.5 ? 'A0' : 'A-';  // A0와 A- 중 하나를 랜덤하게 선택

var result_block_2 = {
  type: 'poldrack-instructions', // poldrack-instructions 플러그인을 사용하여 결과 페이지 생성
  pages: [
    // 결과 페이지의 내용
    '<div class="centerbox" style="line-height: 1.8; width : 600px">' +  // line-height를 사용하여 줄 간격을 늘림
    '<p class="block-text" style = "line-height : 2.5rem; font-weight : 600">' + 
    '이번 테스트에서 당신의 등급은 <strong style="color: red; font-size: 26px; text-decoration: underline;">' + redText + '</strong> (으)로, <br>' +  // 빨간 글씨를 랜덤하게 적용
    '새로운 유형의 문제에 도전하고 이를 해결하려고 노력했기 때문에 이는 매우 훌륭한 결과입니다.</p></div>',
  ],
  allow_keys: false,  // 키 입력 허용 여부 설정
  show_clickable_nav: true,  // 클릭 가능한 네비게이션 버튼 표시
  button_label_finish: '종료',  // 버튼 레이블을 '종료'로 설정
  timing_post_trial: 0,  // 트라이얼이 끝난 후 지연 시간 설정
  data: {
    exp_id: "ravens"  // 실험 ID
  },
};







var result_block_3 = {
  type: 'poldrack-instructions', // poldrack-instructions 플러그인을 사용하여 결과 페이지 생성
  pages: [
    // 결과 페이지의 내용
    '<div class="centerbox">' +
    '<p class="block-text" style = "text-align : center; font-size : 29px; font-weight : 600">' + 
    '수고하셨습니다.</p></div>',

  ],
  allow_keys: false,  // 키 입력 허용 여부 설정
  show_clickable_nav: true,  // 클릭 가능한 네비게이션 버튼 표시
  button_label_finish: '종료',  // 버튼 레이블을 '종료'로 설정
  timing_post_trial: 0,  // 트라이얼이 끝난 후 지연 시간 설정
  data: {
    exp_id: "ravens"  // 실험 ID
  },
};







// 세 개의 결과 블록 중 하나를 랜덤하게 선택
var selected_result_block;

var random_number = Math.random(); // 0 ~ 1 사이의 난수 생성

if (random_number < 1 / 3) {
  selected_result_block = result_block_1;  // 1/3 확률로 result_block_1 선택
} else if (random_number < 2 / 3) {
  selected_result_block = result_block_2;  // 1/3 확률로 result_block_2 선택
} else {
  selected_result_block = result_block_3;  // 1/3 확률로 result_block_3 선택
}

// 선택된 결과 블록을 jsPsych 실험 타임라인에 추가


//Set up experiment
var ravens_experiment = []
ravens_experiment.push(instruction_node);
ravens_experiment.push(practice_node_1);
ravens_experiment.push(practice_feedback_block)
ravens_experiment.push(practice_node_2);
ravens_experiment.push(practice_feedback_block)
ravens_experiment.push(start_test_block);
survey_block.forEach(function(survey) {
  ravens_experiment.push(survey);
});
ravens_experiment.push(end_block);
ravens_experiment.push(selected_result_block);


jsPsych.init({
  display_element: $('#jspsych-target'),
  timeline: ravens_experiment,
  on_finish: function(){jsPsych.data.displayData(); }
});
