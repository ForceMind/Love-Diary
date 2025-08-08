/**
 * 心动日记 - 核心游戏引擎
 * 负责基础游戏机制：存档、UI管理、弹窗系统等
 */
class GameEngine {
    constructor() {
        this.modals = new Map();
        this.eventListeners = new Map();
        this.initialized = false;
    }

    /**
     * 初始化游戏引擎
     */
    init() {
        if (this.initialized) return;
        
        this.setupModalEventListeners();
        this.setupNotificationSystem();
        this.initialized = true;
        
        console.log('GameEngine 初始化完成');
    }

    /**
     * 弹窗管理系统
     */
    showModal(modalId, options = {}) {
        console.log('显示弹窗:', modalId);
        const modal = document.getElementById(modalId);
        
        if (!modal) {
            console.warn(`弹窗 ${modalId} 不存在`);
            return false;
        }

        modal.classList.add('active');
        
        // 设置弹窗参数
        if (options.onShow) {
            options.onShow(modal);
        }
        
        // 记录弹窗状态
        this.modals.set(modalId, {
            element: modal,
            options: options,
            openTime: Date.now()
        });
        
        return true;
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            this.modals.delete(modalId);
        }
    }

    closeAllModals() {
        this.modals.forEach((modal, modalId) => {
            this.closeModal(modalId);
        });
    }

    /**
     * 游戏内通知系统
     */
    setupNotificationSystem() {
        // 添加通知样式
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .game-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 3000;
                    max-width: 350px;
                    word-wrap: break-word;
                    font-weight: 500;
                    border-radius: 15px;
                    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
                    animation: slideInRight 0.5s ease-out;
                }
                
                .notification-success {
                    background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
                    color: white;
                }
                
                .notification-error {
                    background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
                    color: white;
                }
                
                .notification-warning {
                    background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
                    color: white;
                }
                
                .notification-info {
                    background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
                    color: white;
                }
                
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `game-notification notification-${type}`;
        
        // 添加图标
        const iconMap = {
            'error': '❌',
            'success': '✅', 
            'warning': '⚠️',
            'info': 'ℹ️'
        };
        
        const icon = iconMap[type] || 'ℹ️';
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; padding: 15px 20px;">
                <span style="font-size: 18px; margin-right: 10px;">${icon}</span>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // 自动移除
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.5s ease-in';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 500);
            }
        }, duration);

        return notification;
    }

    /**
     * 确认对话框
     */
    showConfirm(message, onConfirm, onCancel = null, options = {}) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.style.cssText = `
            z-index: 4000;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        const title = options.title || '🤔 确认操作';
        const confirmText = options.confirmText || '确认';
        const cancelText = options.cancelText || '取消';

        modal.innerHTML = `
            <div class="modal-content" style="background: white; padding: 30px; border-radius: 15px; max-width: 400px; width: 90%; text-align: center;">
                <h3 style="color: #ff6b9d; margin-bottom: 20px;">${title}</h3>
                <p style="line-height: 1.8; color: #555; margin-bottom: 25px; font-size: 16px;">${message}</p>
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button class="cancel-btn" style="background: #f44336; color: white; border: none; padding: 12px 25px; border-radius: 25px; cursor: pointer; font-weight: 500;">
                        ${cancelText}
                    </button>
                    <button class="confirm-btn" style="background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%); color: white; border: none; padding: 12px 25px; border-radius: 25px; cursor: pointer; font-weight: 500;">
                        ${confirmText}
                    </button>
                </div>
            </div>
        `;

        // 绑定事件
        const cancelBtn = modal.querySelector('.cancel-btn');
        const confirmBtn = modal.querySelector('.confirm-btn');

        cancelBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            if (onCancel) onCancel();
        });

        confirmBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            if (onConfirm) onConfirm();
        });

        // 点击外部关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                if (onCancel) onCancel();
            }
        });

        document.body.appendChild(modal);
        return modal;
    }

    /**
     * 设置弹窗事件监听器
     */
    setupModalEventListeners() {
        // 点击弹窗外部关闭弹窗
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });

        // ESC键关闭弹窗
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    activeModal.classList.remove('active');
                }
            }
        });
    }

    /**
     * 存档系统
     */
    saveGame(gameState) {
        try {
            const saveData = {
                gameState: gameState,
                timestamp: Date.now(),
                version: '1.0.0'
            };
            
            localStorage.setItem('loveDiarySave', JSON.stringify(saveData));
            this.showNotification('游戏已保存', 'success');
            return true;
        } catch (error) {
            console.error('保存游戏失败:', error);
            this.showNotification('保存失败！请检查存储空间', 'error');
            return false;
        }
    }

    loadGame() {
        try {
            const saveData = localStorage.getItem('loveDiarySave');
            if (!saveData) {
                return null;
            }
            
            const parsed = JSON.parse(saveData);
            return parsed.gameState;
        } catch (error) {
            console.error('读取存档失败:', error);
            this.showNotification('读取存档失败', 'error');
            return null;
        }
    }

    deleteSave() {
        try {
            localStorage.removeItem('loveDiarySave');
            this.showNotification('存档已删除', 'success');
            return true;
        } catch (error) {
            console.error('删除存档失败:', error);
            this.showNotification('删除存档失败', 'error');
            return false;
        }
    }

    /**
     * 检查是否有存档
     */
    hasSaveData() {
        return localStorage.getItem('loveDiarySave') !== null;
    }

    /**
     * 获取存档信息
     */
    getSaveInfo() {
        try {
            const saveData = localStorage.getItem('loveDiarySave');
            if (!saveData) return null;
            
            const parsed = JSON.parse(saveData);
            return {
                playerName: parsed.gameState?.player?.name,
                currentWeek: parsed.gameState?.currentWeek,
                playerMajor: parsed.gameState?.player?.major,
                timestamp: parsed.timestamp,
                version: parsed.version
            };
        } catch (error) {
            console.error('获取存档信息失败:', error);
            return null;
        }
    }

    /**
     * 工具方法
     */
    formatDate(timestamp) {
        return new Date(timestamp).toLocaleString();
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}
