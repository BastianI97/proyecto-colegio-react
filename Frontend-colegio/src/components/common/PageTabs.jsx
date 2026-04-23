function PageTabs({ tabs = [], activeTab = '', onTabClick }) {
  return (
    <div style={styles.tabsContainer}>
      {tabs.map((tab) => {
        const label = typeof tab === 'string' ? tab : tab.label
        const value = typeof tab === 'string' ? tab : tab.value ?? tab.label

        return (
          <button
            key={value}
            onClick={() => onTabClick?.(tab)}
            style={{
              ...styles.tab,
              ...(activeTab === value ? styles.activeTab : {}),
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

const styles = {
  tabsContainer: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  tab: {
    border: 'none',
    background: '#f4efe2',
    color: '#111827',
    padding: '12px 22px',
    borderRadius: '14px',
    fontSize: '18px',
    cursor: 'pointer',
  },
  activeTab: {
    background: '#8fd0ff',
  },
}

export default PageTabs