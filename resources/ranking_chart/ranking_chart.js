class RankingChart {
    constructor(rankingChartView) {
        this.rankingChartView = rankingChartView;
        this.rankingChartView.classList.add("ranking-chart-view");
        this.tagList = {};
    }

    push(tag) {
        if(tag in this.tagList) {
            this.tagList[tag] = this.tagList[tag] + 1;
            this.updateView();
        } else {
            this.tagList[tag] = 1;
            this.updateView();
        }
    }

    updateView() {
        var tmpTagList = this.tagList, max = 1,
        sorted = Object.keys(tmpTagList).map(function(key) {
            if(tmpTagList[key] > max) {
                max = tmpTagList[key];
            }
            return [key, tmpTagList[key]];
        });
        max = 100 / max;
        sorted.sort(function(first, second) {
            return second[1] - first[1];
        });
        this.rankingChartView.innerHTML = "";
        for (var i = 0; i < sorted.length; i++) {
            this.rankingChartView.innerHTML += "<div id=\"ranking-chart-bar-" + sorted[i][0] + "\" class=\"ranking-chart-bar\"><span class=\"ranking-chart-tag\">" + sorted[i][0] + "</span><span class=\"ranking-chart-count\">" + sorted[i][1] + "</span></div>";
            document.getElementById("ranking-chart-bar-" + sorted[i][0]).style.backgroundImage = "linear-gradient(90deg, #4285F4 " + (max * sorted[i][1]) + "%, transparent 0%)";
        }
    }
}