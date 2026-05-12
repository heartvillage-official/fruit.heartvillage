# HeartVillage Warmth Recovery 30-Day Cohort 1 Data System

This repository contains a Google Sheets + Apps Script system for managing operations data for:

- **Program**: 하트빌리지 온기회복 30일 입주방 1기
- **Operating period**: **2026-05-13 ~ 2026-06-12**

## What this system builds

When you run the setup function, it creates and configures these sheets:

1. `01_참여자기본정보`
2. `02_시작전기준데이터`
3. `03_매일몸신호기록`
4. `04_반응대응기록`
5. `05_주차별성과체크`
6. `06_최종성과리포트`
7. `07_고객언어수집`

## Core KPIs (auto-calculated)

- 평균 감량 (overall average weight loss)
- 완주율 (completion rate)
- 만족도 평균
- 기록 참여율 (daily logging participation)
- 1인 1개 이상 변화 후기 확보율
- 고객 언어 수집 수
- 반응 유형 빈도 TOP list

## Setup

1. Create a Google Spreadsheet.
2. Open **Extensions → Apps Script**.
3. Copy `Code.gs` into the Apps Script editor.
4. Save and run `setupHeartVillageSystem()` once.
5. (Optional) Set a daily trigger for `refreshMetrics`.

## Daily usage

- Enter participant and baseline data in Sheets 1 and 2.
- Enter daily logs in Sheet 3.
- Enter response/care logs in Sheet 4.
- Enter weekly checks in Sheet 5.
- Enter testimonials and customer language in Sheet 7.
- Run `refreshMetrics()` any time to update final report metrics.

## Notes

- Day is auto-generated in daily log sheet from program start date (2026-05-13).
- Completion is determined by participants with at least one log between day 1 and day 30.
- You can customize scoring rules in `buildFinalReportMetrics_()` if needed.


## First-time quick start (to see real data immediately)

If this is your first time and you want to **see the system working right now**:

1. Run `setupHeartVillageSystem()` once.
2. Run `loadSampleData()` once (this inserts realistic sample participant/baseline/daily/response/language data).
3. Open `06_최종성과리포트` to see computed KPI results immediately.
4. Replace sample rows with your real participant data as operations begin.

You can also use the custom menu: **💗 HeartVillage** → initialize / load sample data / refresh metrics.
