/**
 * UIManager - 统一管理界面更新，降低 GameLogic 与 DOM 的耦合
 */
class UIManager {
    constructor(gameLogic) {
        this.logic = gameLogic;
    }

    updateAll() {
        this.updatePlayerInfo();
        this.updateWeekInfo();
        this.updateActionPoints();
        this.updateWeekStats();
        this.updateAffectionStats();
        this.updateNextWeekButtons();
    }

    updatePlayerInfo() {
        const player = this.logic.gameState.player;
        const el = document.getElementById('player-info');
        if (!el) return;
        const gradeNames = { 1: '大一', 2: '大二', 3: '大三', 4: '大四' };
        el.innerHTML = `姓名：<strong>${player.name || '-'}</strong> ｜ 专业：<strong>${player.major || '-'}</strong> ｜ 年级：<strong>${gradeNames[player.grade] || '-'}</strong>`;
    }

    updateWeekInfo() {
        const w = this.logic.gameState.currentWeek;
        const week = document.getElementById('current-week');
        if (week) week.textContent = `第${w}周`;
        const mobile = document.getElementById('mobile-current-week');
        if (mobile) mobile.textContent = w;
    }

    updateActionPoints() {
        const { actionPoints, maxActionPoints } = this.logic.gameState;
        const ap = document.getElementById('current-actions');
        if (ap) ap.textContent = `${actionPoints}/${maxActionPoints}`;
        const mobileAp = document.getElementById('mobile-current-actions');
        if (mobileAp) mobileAp.textContent = actionPoints;
    }

    updateWeekStats() {
        const stats = this.logic.gameState.weekStats;
        const pairs = [
            ['study-count', stats.study],
            ['social-count', stats.social],
            ['leisure-count', stats.leisure],
            ['encounter-count', stats.encounter],
            ['mobile-study-count', stats.study],
            ['mobile-social-count', stats.social],
            ['mobile-leisure-count', stats.leisure]
        ];
        pairs.forEach(([id, val]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        });
    }

    updateAffectionStats() {
        const container = document.getElementById('affection-stats');
        if (!container) return;
        const rels = this.logic.gameState.characterRelationships;
        if (!rels) {
            container.innerHTML = '<p style="color:#888;">暂无数据</p>';
            return;
        }
        const metStatus = this.logic.gameState.characterMeetStatus || {};
        const filtered = Object.entries(rels).filter(([name]) => metStatus[name]?.met);
        if (filtered.length === 0) {
            container.innerHTML = '<p style="color:#888;">尚未与任何角色相遇</p>';
            return;
        }
        container.innerHTML = filtered.map(([name, r]) => `
            <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px dashed #eee;font-size:13px;">
                <span style="color:#555;">${name}</span>
                <span style="color:#ff6b9d;">❤ ${r.affection} ｜ 🤝 ${r.trust}</span>
            </div>
        `).join('');
    }

    updateNextWeekButtons() {
        const show = this.logic.gameState.actionPoints <= 0;
        const btn = document.getElementById('next-week-btn');
        if (btn) btn.style.display = show ? 'inline-block' : 'none';
        const mBtn = document.getElementById('mobile-next-week-btn');
        if (mBtn) mBtn.style.display = show ? 'block' : 'none';
    }
}
