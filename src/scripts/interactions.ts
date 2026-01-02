// src/scripts/interactions.ts
/**
 * Global interactions for Material Design 3 components
 */

// Dialog management
export const dialog = {
  open(dialogId: string) {
    const dialog = document.getElementById(dialogId);
    if (!dialog) return;

    dialog.classList.add('dialog-open');
    document.body.style.overflow = 'hidden';

    // Focus first focusable element
    const firstFocusable = dialog.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();
  },

  close(dialogId: string) {
    const dialog = document.getElementById(dialogId);
    if (!dialog) return;

    dialog.classList.remove('dialog-open');
    document.body.style.overflow = '';
  },
};

// Menu management
export const menu = {
  open(menuId: string, triggerElement: HTMLElement) {
    const menuEl = document.getElementById(menuId);
    if (!menuEl) return;

    // Close all other menus
    document.querySelectorAll('.menu').forEach(m => {
      if (m.id !== menuId) m.classList.remove('menu-open');
    });

    menuEl.classList.add('menu-open');

    // Position menu relative to trigger
    const triggerRect = triggerElement.getBoundingClientRect();
    const position = menuEl.dataset.position || 'bottom-start';

    if (position.includes('bottom')) {
      menuEl.style.top = `${triggerRect.bottom + 4}px`;
    } else if (position.includes('top')) {
      menuEl.style.bottom = `${window.innerHeight - triggerRect.top + 4}px`;
    }

    if (position.includes('start')) {
      menuEl.style.left = `${triggerRect.left}px`;
    } else if (position.includes('end')) {
      menuEl.style.right = `${window.innerWidth - triggerRect.right}px`;
    }

    // Focus first menu item
    const firstItem = menuEl.querySelector<HTMLElement>('.menu-item:not([disabled])');
    firstItem?.focus();
  },

  close(menuId: string) {
    const menuEl = document.getElementById(menuId);
    if (!menuEl) return;
    menuEl.classList.remove('menu-open');
  },

  closeAll() {
    document.querySelectorAll('.menu').forEach(m => {
      m.classList.remove('menu-open');
    });
  },
};

// Snackbar management
export const snackbar = {
  show(snackbarId: string, options: { message: string; action?: { text: string; handler: () => void } }) {
    const snackbar = document.getElementById(snackbarId);
    if (!snackbar) return;

    const messageEl = snackbar.querySelector('.snackbar-message');
    const actionBtn = snackbar.querySelector('.snackbar-action') as HTMLButtonElement;

    if (messageEl) messageEl.textContent = options.message;

    if (options.action && actionBtn) {
      actionBtn.textContent = options.action.text;
      actionBtn.style.display = 'block';
      actionBtn.onclick = () => {
        options.action!.handler();
        this.hide(snackbarId);
      };
    } else if (actionBtn) {
      actionBtn.style.display = 'none';
    }

    snackbar.classList.add('snackbar-open');

    // Auto-hide after 4 seconds
    setTimeout(() => this.hide(snackbarId), 4000);
  },

  hide(snackbarId: string) {
    const snackbar = document.getElementById(snackbarId);
    if (!snackbar) return;
    snackbar.classList.remove('snackbar-open');
  },
};

// Tab management
export const tabs = {
  switchTab(tabId: string, panelId: string) {
    const tab = document.querySelector(`[data-tab-id="${tabId}"]`);
    if (!tab) return;

    const tabList = tab.closest('.tabs');
    if (!tabList) return;

    // Deactivate all tabs
    tabList.querySelectorAll('.tab').forEach(t => {
      t.classList.remove('tab-active');
      t.setAttribute('aria-selected', 'false');
    });

    // Activate clicked tab
    tab.classList.add('tab-active');
    tab.setAttribute('aria-selected', 'true');

    // Hide all panels and show target
    document.querySelectorAll('.showcase-panel').forEach(panel => {
      panel.classList.remove('active');
    });

    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }

    // Move indicator
    this.updateIndicator(tabList as HTMLElement, tab as HTMLElement);
  },

  updateIndicator(tabList: HTMLElement, activeTab: HTMLElement) {
    const indicator = tabList.querySelector('.tabs-indicator') as HTMLElement;
    if (!indicator) return;

    const tabRect = activeTab.getBoundingClientRect();
    const listRect = tabList.getBoundingClientRect();

    indicator.style.left = `${tabRect.left - listRect.left}px`;
    indicator.style.width = `${tabRect.width}px`;
  },
};

// Initialize on DOM load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    // Dialog triggers
    document.querySelectorAll('[data-dialog-open]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const dialogId = (trigger as HTMLElement).dataset.dialogOpen;
        if (dialogId) dialog.open(dialogId);
      });
    });

    document.querySelectorAll('[data-dialog-close]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const dialogId = (trigger as HTMLElement).dataset.dialogClose;
        if (dialogId) dialog.close(dialogId);
      });
    });

    // Close dialog on backdrop click
    document.querySelectorAll('.dialog-scrim').forEach(scrim => {
      scrim.addEventListener('click', (e) => {
        if (e.target === scrim) {
          const dialogId = scrim.parentElement?.id;
          if (dialogId) dialog.close(dialogId);
        }
      });
    });

    // Close dialog on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.dialog-open').forEach(d => {
          dialog.close(d.id);
        });
        menu.closeAll();
      }
    });

    // Menu triggers
    document.querySelectorAll('[data-menu-trigger]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const menuId = (trigger as HTMLElement).dataset.menuTrigger;
        if (menuId) menu.open(menuId, trigger as HTMLElement);
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.menu') && !target.closest('[data-menu-trigger]')) {
        menu.closeAll();
      }
    });

    // Menu item clicks
    document.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', () => {
        const menuEl = item.closest('.menu');
        if (menuEl) menu.close(menuEl.id);
      });
    });

    // Tab clicks
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const tabId = (tab as HTMLElement).dataset.tabId;
        const panelId = (tab as HTMLElement).dataset.panelId;
        if (tabId && panelId) tabs.switchTab(tabId, panelId);
      });
    });

    // Initialize tab indicator
    const firstTabList = document.querySelector('.tabs');
    const firstActiveTab = firstTabList?.querySelector('.tab-active');
    if (firstTabList && firstActiveTab) {
      tabs.updateIndicator(firstTabList as HTMLElement, firstActiveTab as HTMLElement);
    }

    // Chip remove buttons
    document.querySelectorAll('.chip-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const chip = btn.closest('.chip');
        if (chip) {
          chip.dispatchEvent(new CustomEvent('chip-removed', {
            detail: { chip },
            bubbles: true,
          }));
          chip.remove();
        }
      });
    });
  });

  // Make functions available globally
  (window as any).dialog = dialog;
  (window as any).menu = menu;
  (window as any).snackbar = snackbar;
  (window as any).tabs = tabs;
}
