import { defineStore } from "pinia"
import api from "@apis/chart"

export const useStore = defineStore("store", {
    state: () => ({
        searchValue: "",
        ticker_ko: "",
        ticker_en: "",
        graphData: [],
        // About Page
        period: "",
        todayValue: 0,
        yesterdayValue: 0,
        // loading
        isLoading: false,
    }),
    getters: {
        increaseValue: (state) => {
            const res = state.todayValue - state.yesterdayValue
            return res.toFixed(2)
        },
        increaseRate: (state) => {
            const res = ((state.todayValue - state.yesterdayValue) * 100) / state.yesterdayValue
            return res.toFixed(2)
        },
    },
    actions: {
        async getStock(inputValue: string, timeSpan: string) {
            if (timeSpan === "") this.period = "month"
            else if (timeSpan !== "") this.period = timeSpan

            if (inputValue !== "") {
                // store의 state에 검색 값을 할당
                if (inputValue === "AAPL") {
                    this.ticker_ko = "애플"
                    this.ticker_en = "Apple"
                }
                if (inputValue === "GOOG") {
                    this.ticker_ko = "구글"
                    this.ticker_en = "Google"
                }
                if (inputValue === "NFLX") {
                    this.ticker_ko = "넷플릭스"
                    this.ticker_en = "Netfilx"
                }
                if (inputValue === "AMZN") {
                    this.ticker_ko = "아마존"
                    this.ticker_en = "Amazon"
                }
                if (inputValue === "MSFT") {
                    this.ticker_ko = "마이크로소프트"
                    this.ticker_en = "Microsoft"
                }
                if (inputValue === "IBM") {
                    this.ticker_ko = "아이비엠"
                    this.ticker_en = "IBM"
                }
                if (inputValue === "META") {
                    this.ticker_ko = "메타"
                    this.ticker_en = "Meta"
                }
                if (inputValue === "TSLA") {
                    this.ticker_ko = "테슬라"
                    this.ticker_en = "Tesla"
                }

                this.searchValue = inputValue
                await api.getStock(inputValue, this.period).then((res: any) => {
                    this.graphData = res.data.results.map((item: any) => {
                        return item.o
                    })
                    this.todayValue = this.graphData[this.graphData.length - 1]
                    this.yesterdayValue = this.graphData[this.graphData.length - 2]
                })
                return this.graphData
            } else if (inputValue === "") {
                if (timeSpan === "") this.period = "month"
                else if (timeSpan !== "") this.period = timeSpan

                this.ticker_ko = "애플"
                this.ticker_en = "Apple"
                this.searchValue = "AAPL"

                await api.getStock("AAPL", this.period).then((res: any) => {
                    this.graphData = res.data.results.map((item: any) => {
                        return item.o
                    })
                    this.todayValue = this.graphData[this.graphData.length - 1]
                    this.yesterdayValue = this.graphData[this.graphData.length - 2]
                })
                return this.graphData
            }
        },
    },
})
