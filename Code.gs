const CONFIG = {
  PROGRAM_NAME: '하트빌리지 온기회복 30일 입주방 1기',
  PROGRAM_START: '2026-05-13',
  PROGRAM_END: '2026-06-12',
  OPERATION_START: '2026-05-13',
  OPERATION_END: '2026-06-11',
  REVIEW_DAY: '2026-06-12',
  SHEETS: {
    PARTICIPANTS: '01_참여자기본정보',
    BASELINE: '02_시작전기준데이터',
    DAILY_LOG: '03_매일몸신호기록',
    RESPONSE_LOG: '04_반응대응기록',
    WEEKLY_CHECK: '05_주차별성과체크',
    FINAL_REPORT: '06_최종성과리포트',
    CUSTOMER_LANGUAGE: '07_고객언어수집'
  }
};


function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('💗 HeartVillage')
    .addItem('1) 시트 초기화', 'setupHeartVillageSystem')
    .addItem('2) 샘플 데이터 넣기(처음 사용자용)', 'loadSampleData')
    .addItem('3) 성과 지표 새로고침', 'refreshMetrics')
    .addToUi();
}

function loadSampleData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  setupHeartVillageSystem();

  const participants = getOrCreateSheet_(ss, CONFIG.SHEETS.PARTICIPANTS);
  const baseline = getOrCreateSheet_(ss, CONFIG.SHEETS.BASELINE);
  const daily = getOrCreateSheet_(ss, CONFIG.SHEETS.DAILY_LOG);
  const response = getOrCreateSheet_(ss, CONFIG.SHEETS.RESPONSE_LOG);
  const language = getOrCreateSheet_(ss, CONFIG.SHEETS.CUSTOMER_LANGUAGE);

  const participantRows = [
    ['김온기', '2026-05-13', '30일', 71.2, 66.0, '붓기/피로', '주2회 외식', '수면 불규칙', '아침에 몸이 너무 무거워요', 9, 'Y'],
    ['박회복', '2026-05-13', '30일', 64.8, 60.0, '더부룩함/변비', '회식 1회', '위장 예민', '체중 말고 뭘 봐야 할지 모르겠어요', 10, 'Y'],
    ['이따뜻', '2026-05-13', '18일', 58.4, 55.5, '피로/냉기', '가족 모임', '저혈압 경향', '몸 반응이 오면 무서워요', 8, 'N']
  ];

  const baselineRows = [
    ['김온기', '2026-05-13', 71.2, 4, 3, 4, 2, '딱딱함', 2, 2, 1, 2],
    ['박회복', '2026-05-13', 64.8, 3, 4, 3, 2, '못 봄', 3, 3, 2, 2],
    ['이따뜻', '2026-05-13', 58.4, 4, 2, 4, 3, '보통', 2, 2, 1, 3]
  ];

  const dailyRows = [
    ['2026-05-13', '김온기', '', 71.2, '심함', '더부룩함', '딱딱함', 4, 2, '아침에 무겁고 붓는 느낌', '없음', '수분 섭취 가이드'],
    ['2026-05-20', '김온기', '', 69.9, '줄었음', '편함', '봄', 3, 3, '오후 피로가 줄었어요', '약한 몸살기', '염분 조절/휴식 안내'],
    ['2026-06-11', '김온기', '', 67.8, '줄었음', '편함', '봄', 2, 4, '몸이 가벼워요', '없음', '유지 루틴 안내'],
    ['2026-05-13', '박회복', '', 64.8, '비슷함', '더부룩함', '못 봄', 3, 3, '속이 답답해요', '울렁임', '식사 속도/양 조절'],
    ['2026-05-22', '박회복', '', 63.2, '줄었음', '편함', '봄', 2, 4, '배가 편해졌어요', '가스 증가', '식이섬유/수분 조정'],
    ['2026-06-11', '박회복', '', 61.1, '줄었음', '편함', '보통', 1, 4, '붓기 빠진 게 보여요', '없음', '마무리 리포트 안내'],
    ['2026-05-13', '이따뜻', '', 58.4, '심함', '편함', '보통', 4, 2, '손발이 차고 피곤해요', '어지러움', '기상 직후 섭취 조절'],
    ['2026-05-30', '이따뜻', '', 57.6, '비슷함', '편함', '봄', 3, 3, '체중보다 컨디션이 좋아요', '없음', '수면 루틴 점검']
  ];

  const responseRows = [
    ['2026-05-20', '김온기', '몸살기', 2, '오후', '몸살처럼 무거워요', '정리 모드 반응 가능성', '휴식과 수분 보충', '익일 완화'],
    ['2026-05-22', '박회복', '가스/냄새', 2, '저녁', '방귀 냄새가 심해요', '장 흐름 변화 신호', '식사 속도/수분 조정', '3일 내 완화'],
    ['2026-05-13', '이따뜻', '어지러움', 3, '오전', '갑자기 어지러워요', '초기 적응 반응', '섭취량 조정', '당일 안정']
  ];

  const languageRows = [
    ['김온기', '2026-06-12', '몸이 가벼워진다는 게 이런 거네요', '가벼움 체감', '후기 가능'],
    ['박회복', '2026-06-12', '여기는 그냥 굶기는 게 아니라 몸을 읽어줘요', '몸 읽기', '상세 후기 가능'],
    ['이따뜻', '2026-06-12', '혼자 했으면 못 했을 것 같아요', '커뮤니티 가치', '콘텐츠 가능']
  ];

  writeRows_(participants, participantRows);
  writeRows_(baseline, baselineRows);
  writeRows_(daily, dailyRows);
  writeRows_(response, responseRows);
  writeRows_(language, languageRows);

  refreshMetrics();
}
function setupHeartVillageSystem() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  setupParticipantsSheet_(ss);
  setupBaselineSheet_(ss);
  setupDailyLogSheet_(ss);
  setupResponseSheet_(ss);
  setupWeeklySheet_(ss);
  setupCustomerLanguageSheet_(ss);
  setupFinalReportSheet_(ss);
  refreshMetrics();

  SpreadsheetApp.flush();
}

function refreshMetrics() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const finalSheet = getOrCreateSheet_(ss, CONFIG.SHEETS.FINAL_REPORT);
  const metrics = buildFinalReportMetrics_(ss);

  const rows = [
    ['프로그램명', CONFIG.PROGRAM_NAME],
    ['운영기간', `${CONFIG.PROGRAM_START} ~ ${CONFIG.PROGRAM_END}`],
    ['총 참여자 수', metrics.totalParticipants],
    ['완주자 수', metrics.completers],
    ['완주율', metrics.completionRate],
    ['시작 평균 체중(kg)', metrics.avgStartWeight],
    ['종료 평균 체중(kg)', metrics.avgEndWeight],
    ['전체 평균 감량(kg)', metrics.avgLoss],
    ['최대 감량(kg)', metrics.maxLoss],
    ['만족도 평균(0~10)', metrics.avgSatisfaction],
    ['기록 참여율', metrics.recordParticipationRate],
    ['1인 1개 이상 변화 후기 확보율', metrics.reviewCoverageRate],
    ['후기 제출 수', metrics.reviewCount],
    ['고객 언어 수집 수', metrics.customerLanguageCount],
    ['주요 반응 유형 TOP5', metrics.reactionTop5]
  ];

  finalSheet.clear();
  finalSheet.getRange(1, 1, 1, 2).setValues([['항목', '결과']]);
  finalSheet.getRange(2, 1, rows.length, 2).setValues(rows);
  finalSheet.autoResizeColumns(1, 2);
}

function setupParticipantsSheet_(ss) {
  const headers = [
    '고객명', '시작일', '프로그램유형(18일/30일)', '시작체중(kg)', '목표체중(kg)',
    '주요고민', '식사일정리스크', '주의사항', '고객시작언어', '만족도(0~10)', '변화후기제출(Y/N)'
  ];
  const sheet = getOrCreateSheet_(ss, CONFIG.SHEETS.PARTICIPANTS);
  formatHeaderSheet_(sheet, headers);
  sheet.getRange('B2:B').setNumberFormat('yyyy-mm-dd');
}

function setupBaselineSheet_(ss) {
  const headers = [
    '고객명', '측정일', '체중(kg)', '붓기(0~5)', '더부룩함(0~5)', '피로감(0~5)',
    '속편안함(0~5)', '변상태', '수면만족(0~5)', '얼굴빛만족(0~5)', '몸가벼움(0~5)', '다이어트자신감(0~5)'
  ];
  const sheet = getOrCreateSheet_(ss, CONFIG.SHEETS.BASELINE);
  formatHeaderSheet_(sheet, headers);
  sheet.getRange('B2:B').setNumberFormat('yyyy-mm-dd');
}

function setupDailyLogSheet_(ss) {
  const headers = [
    '날짜', '고객명', 'Day', '체중(kg)', '붓기', '속상태', '변상태', '피로감(0~5)', '수면(0~5)',
    '오늘몸느낌한줄', '특이반응', '담당자대응', '누적감량(kg)'
  ];
  const sheet = getOrCreateSheet_(ss, CONFIG.SHEETS.DAILY_LOG);
  formatHeaderSheet_(sheet, headers);
  sheet.getRange('A2:A').setNumberFormat('yyyy-mm-dd');

  const formulaDay = '=IF(A2="","",A2-DATE(2026,5,13)+1)';
  const formulaLoss = '=IF(OR(B2="",D2=""),"",IFERROR(VLOOKUP(B2,\'' + CONFIG.SHEETS.PARTICIPANTS + '\'!A:D,4,FALSE)-D2,""))';
  sheet.getRange('C2').setFormula(formulaDay);
  sheet.getRange('M2').setFormula(formulaLoss);
  sheet.getRange('C2:C').setNumberFormat('0');
  sheet.getRange('M2:M').setNumberFormat('0.00');
}

function setupResponseSheet_(ss) {
  const headers = [
    '날짜', '고객명', '반응유형', '강도(1~5)', '발생시점', '고객표현그대로', '하트빌리지해석', '안내한대응', '결과'
  ];
  const sheet = getOrCreateSheet_(ss, CONFIG.SHEETS.RESPONSE_LOG);
  formatHeaderSheet_(sheet, headers);
  sheet.getRange('A2:A').setNumberFormat('yyyy-mm-dd');
}

function setupWeeklySheet_(ss) {
  const headers = [
    '주차', '기간', '평균감량(kg)', '기록참여율', '완주위험고객', '주요반응TOP3', '가장많이나온고객언어', '운영개선점'
  ];
  const sheet = getOrCreateSheet_(ss, CONFIG.SHEETS.WEEKLY_CHECK);
  formatHeaderSheet_(sheet, headers);

  const seed = [
    ['1주차', '2026-05-13 ~ 2026-05-19', '', '', '', '', '', '루틴 적응, 반응 안심, 기록 습관 만들기'],
    ['2주차', '2026-05-20 ~ 2026-05-26', '', '', '', '', '', '몸 신호 해석 훈련, 붓기/속/변 변화 확인'],
    ['3주차', '2026-05-27 ~ 2026-06-02', '', '', '', '', '', '체중 외 변화 인식, 중간 후기 수집'],
    ['4주차', '2026-06-03 ~ 2026-06-09', '', '', '', '', '', '변화 확신, 입소문 언어 만들기'],
    ['마무리', '2026-06-10 ~ 2026-06-12', '', '', '', '', '', '최종 측정, 후기, 다음 관리 제안']
  ];
  sheet.getRange(2, 1, seed.length, seed[0].length).setValues(seed);
}

function setupFinalReportSheet_(ss) {
  const sheet = getOrCreateSheet_(ss, CONFIG.SHEETS.FINAL_REPORT);
  sheet.clear();
  sheet.getRange(1, 1, 1, 2).setValues([['항목', '결과']]);
  sheet.setFrozenRows(1);
}

function setupCustomerLanguageSheet_(ss) {
  const headers = ['고객명', '날짜', '고객실제문장', '분류', '활용가능여부'];
  const sheet = getOrCreateSheet_(ss, CONFIG.SHEETS.CUSTOMER_LANGUAGE);
  formatHeaderSheet_(sheet, headers);
  sheet.getRange('B2:B').setNumberFormat('yyyy-mm-dd');
}

function buildFinalReportMetrics_(ss) {
  const participants = readRowsAsObjects_(ss.getSheetByName(CONFIG.SHEETS.PARTICIPANTS));
  const daily = readRowsAsObjects_(ss.getSheetByName(CONFIG.SHEETS.DAILY_LOG));
  const responses = readRowsAsObjects_(ss.getSheetByName(CONFIG.SHEETS.RESPONSE_LOG));
  const language = readRowsAsObjects_(ss.getSheetByName(CONFIG.SHEETS.CUSTOMER_LANGUAGE));

  const totalParticipants = participants.filter(r => r['고객명']).length;

  const startWeightByName = {};
  const satisfaction = [];
  const reviewSet = new Set();

  participants.forEach(row => {
    const name = row['고객명'];
    if (!name) return;
    const sw = toNumber_(row['시작체중(kg)']);
    if (!isNaN(sw)) startWeightByName[name] = sw;
    const sat = toNumber_(row['만족도(0~10)']);
    if (!isNaN(sat)) satisfaction.push(sat);
    if (String(row['변화후기제출(Y/N)']).toUpperCase() === 'Y') reviewSet.add(name);
  });

  const validDaily = daily.filter(r => r['고객명'] && r['날짜']);
  const grouped = {};
  validDaily.forEach(r => {
    const n = r['고객명'];
    if (!grouped[n]) grouped[n] = [];
    grouped[n].push(r);
  });

  let totalLoss = 0, lossCount = 0, maxLoss = 0;
  let sumStart = 0, sumEnd = 0, endCount = 0;
  let completers = 0;

  Object.keys(grouped).forEach(name => {
    const rows = grouped[name].sort((a, b) => new Date(a['날짜']) - new Date(b['날짜']));
    const start = toNumber_(startWeightByName[name]);
    const end = toNumber_(rows[rows.length - 1]['체중(kg)']);

    if (!isNaN(start) && !isNaN(end)) {
      const loss = start - end;
      totalLoss += loss;
      lossCount += 1;
      maxLoss = Math.max(maxLoss, loss);
      sumStart += start;
      sumEnd += end;
      endCount += 1;
    }
    if (rows.length > 0) completers += 1;
  });

  const operationDays = 30;
  const possibleLogs = totalParticipants * operationDays;
  const recordParticipationRate = possibleLogs > 0 ? validDaily.length / possibleLogs : 0;

  const reactionCount = {};
  responses.forEach(r => {
    const t = String(r['반응유형'] || '').trim();
    if (!t) return;
    reactionCount[t] = (reactionCount[t] || 0) + 1;
  });
  const reactionTop5 = Object.keys(reactionCount)
    .sort((a, b) => reactionCount[b] - reactionCount[a])
    .slice(0, 5)
    .map(k => `${k}(${reactionCount[k]})`)
    .join(', ');

  return {
    totalParticipants,
    completers,
    completionRate: percent_(totalParticipants ? completers / totalParticipants : 0),
    avgStartWeight: number2_(endCount ? sumStart / endCount : 0),
    avgEndWeight: number2_(endCount ? sumEnd / endCount : 0),
    avgLoss: number2_(lossCount ? totalLoss / lossCount : 0),
    maxLoss: number2_(maxLoss),
    avgSatisfaction: number2_(satisfaction.length ? satisfaction.reduce((a, b) => a + b, 0) / satisfaction.length : 0),
    recordParticipationRate: percent_(recordParticipationRate),
    reviewCoverageRate: percent_(totalParticipants ? reviewSet.size / totalParticipants : 0),
    reviewCount: reviewSet.size,
    customerLanguageCount: language.filter(r => r['고객실제문장']).length,
    reactionTop5: reactionTop5 || '-'
  };
}


function writeRows_(sheet, rows) {
  if (!rows.length) return;
  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
}

function getOrCreateSheet_(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function formatHeaderSheet_(sheet, headers) {
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#ffe4ec');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
}

function readRowsAsObjects_(sheet) {
  if (!sheet) return [];
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0];
  return values.slice(1).map(r => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = r[i]);
    return obj;
  });
}

function toNumber_(v) {
  const n = Number(v);
  return isNaN(n) ? NaN : n;
}

function number2_(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function percent_(ratio) {
  return `${Math.round(ratio * 10000) / 100}%`;
}
