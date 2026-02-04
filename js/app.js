// Tailwind configuration
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                gray: { 850: '#1f2937', 900: '#111827', 950: '#030712' },
                primary: { 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2' },
                danger: { 400: '#f87171', 500: '#ef4444' },
                success: { 400: '#4ade80', 500: '#22c55e' },
                warning: { 400: '#fbbf24', 500: '#f59e0b' }
            },
            fontFamily: {
                mono: ['Fira Code', 'monospace'],
                sans: ['Inter', 'sans-serif']
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'slide-in': 'slideIn 0.3s ease-out',
                'fade-in': 'fadeIn 0.2s ease-out'
            },
            keyframes: {
                slideIn: {
                    '0%': { transform: 'translateX(100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' }
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                }
            }
        }
    }
};

// Building data structure
const buildings = [
    { id: 1, name: "Main Campus Tower A", doors: 24, online: true, syncRate: 99.8, latency: 128, alerts: 0, location: "North Wing, Floors 1-18" },
    { id: 2, name: "Corporate HQ Bldg B", doors: 18, online: true, syncRate: 100.0, latency: 89, alerts: 0, location: "South Plaza, Floors B1-12" },
    { id: 3, name: "Research Center C", doors: 32, online: true, syncRate: 99.9, latency: 156, alerts: 0, location: "East Block, Labs 1-16" },
    { id: 4, name: "Admin Offices D", doors: 15, online: true, syncRate: 100.0, latency: 72, alerts: 0, location: "West Wing, Floors 1-8" },
    { id: 5, name: "Tech Park E", doors: 28, online: true, syncRate: 99.7, latency: 203, alerts: 0, location: "Industrial Zone, Units 1-28" },
    { id: 6, name: "Conference Center F", doors: 12, online: true, syncRate: 100.0, latency: 65, alerts: 0, location: "Ground Level, Halls A-G" },
    { id: 7, name: "Storage Facility G", doors: 36, online: true, syncRate: 99.9, latency: 189, alerts: 0, location: "Basement Levels B1-B3" },
    { id: 8, name: "Training Institute H", doors: 22, online: true, syncRate: 99.8, latency: 142, alerts: 0, location: "Education Block, Classrooms 1-22" },
    { id: 9, name: "Medical Clinic I", doors: 14, online: true, syncRate: 100.0, latency: 78, alerts: 0, location: "Healthcare Wing, Floors 1-4" },
    { id: 10, name: "Library J", doors: 16, online: true, syncRate: 99.9, latency: 95, alerts: 0, location: "Academic Center, Floors 1-6" },
    { id: 11, name: "Gymnasium K", doors: 10, online: true, syncRate: 100.0, latency: 67, alerts: 0, location: "Recreation Complex, Ground Floor" },
    { id: 12, name: "Dining Hall L", doors: 8, online: true, syncRate: 99.8, latency: 82, alerts: 0, location: "Food Court, Main Level" },
    { id: 13, name: "Parking Garage M", doors: 18, online: true, syncRate: 99.9, latency: 167, alerts: 0, location: "Levels P1-P3" },
    { id: 14, name: "Visitor Center N", doors: 6, online: true, syncRate: 100.0, latency: 58, alerts: 0, location: "Entrance Plaza, Reception Area" },
    { id: 15, name: "Maintenance Hub O", doors: 12, online: true, syncRate: 99.7, latency: 198, alerts: 0, location: "Service Yard, Workshop Area" },
    { id: 16, name: "Data Center P", doors: 8, online: true, syncRate: 100.0, latency: 45, alerts: 0, location: "Secure Room, Floor 2" },
    { id: 17, name: "Executive Suites Q", doors: 10, online: true, syncRate: 99.9, latency: 76, alerts: 0, location: "Penthouse Level, Offices 1-10" },
    { id: 18, name: "Emergency Shelter R", doors: 6, online: true, syncRate: 100.0, latency: 52, alerts: 0, location: "Basement B2, Safety Zone" }
];

// DOM elements
const views = {
    dashboard: document.getElementById('view-dashboard'),
    events: document.getElementById('view-events'),
    users: document.getElementById('view-users'),
    logs: document.getElementById('view-logs')
};

let currentView = 'dashboard';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    renderBuildings();
    updateStats();
    setInterval(updateStats, 5000);
    setInterval(updateBuildings, 10000);
});

// Switch between views
function switchView(viewName) {
    // Hide all views
    Object.values(views).forEach(view => {
        view.classList.add('hidden');
    });
    
    // Show selected view
    views[viewName].classList.remove('hidden');
    currentView = viewName;
    
    // Update page title
    const titles = {
        dashboard: 'Dashboard Overview',
        events: 'Sync Events',
        users: 'Access Cards',
        logs: 'System Logs'
    };
    document.getElementById('page-title').textContent = titles[viewName];
    
    // Update navigation active state
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('bg-primary-500/10', 'text-primary-400', 'border-primary-500/20');
        btn.classList.add('text-gray-400');
    });
    
    const activeBtn = document.querySelector(`[data-view="${viewName}"]`);
    activeBtn.classList.remove('text-gray-400');
    activeBtn.classList.add('bg-primary-500/10', 'text-primary-400', 'border-primary-500/20');
}

// Filter buildings
function filterBuildings(filterType) {
    // Update filter button states
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.classList.remove('active-filter', 'bg-primary-500/20', 'text-primary-400', 'border-primary-500/30');
        btn.classList.add('bg-gray-800', 'text-gray-400', 'border-gray-700');
    });
    
    const activeFilter = document.querySelector(`[data-filter="${filterType}"]`);
    activeFilter.classList.add('active-filter', 'bg-primary-500/20', 'text-primary-400', 'border-primary-500/30');
    
    // Apply filter logic would go here
    renderBuildings(filterType);
}

// Render buildings grid
function renderBuildings(filter = 'all') {
    const grid = document.getElementById('buildings-grid');
    let filteredBuildings = buildings;
    
    if (filter === 'issue') {
        filteredBuildings = buildings.filter(building => building.alerts > 0);
    }
    
    grid.innerHTML = filteredBuildings.map(building => `
        <div class="building-card glass-panel rounded-xl p-6 border border-gray-800 hover:border-primary-500/30 group relative">
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-lg bg-gradient-to-br ${building.online ? 'from-success-500/20 to-green-600/20' : 'from-danger-500/20 to-red-600/20'} flex items-center justify-center">
                        <i class="fas ${building.online ? 'fa-building text-success-400' : 'fa-exclamation-triangle text-danger-400'}"></i>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white">${building.name}</h4>
                        <p class="text-xs text-gray-500">${building.location}</p>
                    </div>
                </div>
                <div class="flex gap-1">
                    <span class="w-2 h-2 rounded-full ${building.online ? 'bg-success-500' : 'bg-danger-500'} status-dot"></span>
                </div>
            </div>
            
            <div class="space-y-3">
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-400">Doors</span>
                    <span class="font-medium text-white">${building.doors}</span>
                </div>
                
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-400">Sync Rate</span>
                    <span class="font-medium text-white">${building.syncRate}%</span>
                </div>
                
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-400">Latency</span>
                    <span class="font-medium text-white">${building.latency}ms</span>
                </div>
                
                <div class="pt-3 border-t border-gray-800">
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-400">Status</span>
                        <span class="px-2 py-1 rounded-full text-xs ${building.online ? 'bg-success-500/20 text-success-400' : 'bg-danger-500/20 text-danger-400'}">
                            ${building.online ? 'Online' : 'Offline'}
                        </span>
                    </div>
                </div>
            </div>
            
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onclick="refreshBuilding(${building.id})" class="w-8 h-8 rounded-lg bg-gray-800/80 backdrop-blur text-gray-400 hover:text-white hover:bg-gray-700/80 flex items-center justify-center transition-colors">
                    <i class="fas fa-sync-alt text-xs"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Update statistics
function updateStats() {
    const onlineBuildings = buildings.filter(b => b.online).length;
    const totalDoors = buildings.reduce((sum, b) => sum + b.doors, 0);
    const avgLatency = Math.round(buildings.reduce((sum, b) => sum + b.latency, 0) / buildings.length);
    const pendingEvents = buildings.reduce((sum, b) => sum + b.alerts, 0);
    
    document.getElementById('stat-total-doors').textContent = totalDoors;
    document.getElementById('stat-sync-status').textContent = 'Real-time';
    document.getElementById('stat-pending').textContent = pendingEvents;
    document.getElementById('stat-latency').innerHTML = `${avgLatency}<span class="text-lg text-gray-500 ml-1">ms</span>`;
    document.getElementById('global-uptime').textContent = `${Math.round((onlineBuildings/buildings.length)*100)}%`;
    document.getElementById('nav-count').textContent = onlineBuildings;
    document.getElementById('pending-count').textContent = pendingEvents;
    document.getElementById('event-rate').textContent = Math.floor(Math.random() * 10) + 20; // Simulated event rate
}

// Update building data periodically
function updateBuildings() {
    // Simulate random changes to building data
    buildings.forEach(building => {
        // Randomly change some values to simulate activity
        if (Math.random() > 0.95) {
            building.online = !building.online;
        }
        
        // Small random variations in sync rate and latency
        building.syncRate = Math.max(99.5, Math.min(100.0, building.syncRate + (Math.random() * 0.1 - 0.05)));
        building.latency = Math.max(40, Math.min(300, building.latency + Math.floor(Math.random() * 20 - 10)));
    });
    
    if (currentView === 'dashboard') {
        renderBuildings();
        updateStats();
    }
}

// Refresh individual building
function refreshBuilding(buildingId) {
    const building = buildings.find(b => b.id === buildingId);
    if (building) {
        building.online = true; // Set to online when refreshed
        building.latency = Math.max(40, Math.floor(Math.random() * 100 + 30)); // New latency
        
        // Update UI for this specific building
        if (currentView === 'dashboard') {
            renderBuildings();
            updateStats();
        }
    }
}

// Refresh all buildings
function refreshAllBuildings() {
    buildings.forEach(building => {
        building.online = true;
        building.latency = Math.max(40, Math.floor(Math.random() * 100 + 30));
    });
    
    renderBuildings();
    updateStats();
}

// Simulate failure for demo purposes
function simulateFailure() {
    // Find a random online building and take it offline
    const onlineBuildings = buildings.filter(b => b.online);
    if (onlineBuildings.length > 0) {
        const randomBuilding = onlineBuildings[Math.floor(Math.random() * onlineBuildings.length)];
        randomBuilding.online = false;
        randomBuilding.latency = 999; // High latency when offline
        
        if (currentView === 'dashboard') {
            renderBuildings();
            updateStats();
        }
    }
}        function switchView(viewName) {
            document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
            document.getElementById(`view-${viewName}`).classList.remove('hidden');
            
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('bg-primary-500/10', 'text-primary-400', 'border', 'border-primary-500/20');
                btn.classList.add('text-gray-400');
                if(btn.dataset.view === viewName) {
                    btn.classList.remove('text-gray-400');
                    btn.classList.add('bg-primary-500/10', 'text-primary-400', 'border', 'border-primary-500/20');
                }
            });

            if(viewName === 'events') renderEvents();
            if(viewName === 'building-detail') renderBuildingDetail();
            
            const titles = {
                'dashboard': 'Dashboard Overview',
                'events': 'Sync Event Queue',
                'users': 'Access Card Management',
                'logs': 'System Logs',
                'building-detail': 'Building Management'
            };
            document.getElementById('page-title').textContent = titles[viewName] || 'Dashboard';
        }

        // Building Grid
        function renderBuildings() {
            const grid = document.getElementById('buildings-grid');
            grid.innerHTML = buildings.map(b => {
                const statusColors = {
                    online: 'bg-success-500',
                    syncing: 'bg-warning-500 animate-pulse',
                    error: 'bg-danger-500'
                };
                const statusText = {
                    online: 'Online',
                    syncing: 'Syncing...',
                    error: 'Connection Error'
                };
                
                return `
                    <div class="building-card glass-panel rounded-xl p-5 border border-gray-800 cursor-pointer group relative overflow-hidden" onclick="openBuilding(${b.id})">
                        <div class="absolute top-0 left-0 w-1 h-full ${b.status === 'online' ? 'bg-success-500' : b.status === 'syncing' ? 'bg-warning-500' : 'bg-danger-500'}"></div>
                        
                        <div class="flex justify-between items-start mb-4 pl-3">
                            <div>
                                <div class="flex items-center gap-2 mb-1">
                                    <h4 class="font-bold text-white text-lg">${b.name}</h4>
                                    <span class="text-xs text-gray-500 font-mono">${b.dbServer}</span>
                                </div>
                                <div class="text-xs text-gray-400">${b.address}</div>
                            </div>
                            <div class="flex flex-col items-end gap-1">
                                <span class="status-dot w-2.5 h-2.5 rounded-full ${statusColors[b.status]}"></span>
                                <span class="text-[10px] uppercase font-bold tracking-wider ${b.status === 'online' ? 'text-success-400' : b.status === 'syncing' ? 'text-warning-400' : 'text-danger-400'}">${statusText[b.status]}</span>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-3 mb-4 pl-3">
                            <div class="bg-gray-950/50 rounded-lg p-2 border border-gray-800">
                                <div class="text-[10px] text-gray-500 uppercase">Doors</div>
                                <div class="text-lg font-semibold text-white">${b.doorCount}</div>
                            </div>
                            <div class="bg-gray-950/50 rounded-lg p-2 border border-gray-800">
                                <div class="text-[10px] text-gray-500 uppercase">Latency</div>
                                <div class="text-lg font-semibold text-white">${b.latency}<span class="text-xs text-gray-500 ml-0.5">ms</span></div>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between text-xs text-gray-500 pl-3 border-t border-gray-800 pt-3">
                            <span><i class="fas fa-clock mr-1"></i>Last sync: ${b.lastSync}s ago</span>
                            <span class="group-hover:text-primary-400 transition-colors"><i class="fas fa-chevron-right"></i></span>
                        </div>
                        
                        ${b.status === 'syncing' ? '<div class="absolute bottom-0 left-0 h-0.5 bg-warning-500 animate-[shimmer_2s_infinite] w-full"></div>' : ''}
                    </div>
                `;
            }).join('');
            
            document.getElementById('nav-count').textContent = buildings.filter(b => b.status === 'online').length;
        }

        function filterBuildings(type) {
            document.querySelectorAll('[data-filter]').forEach(btn => {
                btn.classList.remove('bg-primary-500/20', 'text-primary-400', 'border-primary-500/30');
                btn.classList.add('bg-gray-800', 'text-gray-400', 'border-gray-700');
            });
            event.target.classList.remove('bg-gray-800', 'text-gray-400', 'border-gray-700');
            event.target.classList.add('bg-primary-500/20', 'text-primary-400', 'border-primary-500/30');
            
            // Simple filter logic for demo
            if(type === 'issue') {
                buildings.forEach(b => b.hidden = b.status === 'online');
            } else {
                buildings.forEach(b => b.hidden = false);
            }
            renderBuildings();
        }

        // Building Detail View
        function openBuilding(id) {
            currentBuilding = buildings.find(b => b.id === id);
            switchView('building-detail');
        }

        function renderBuildingDetail() {
            if(!currentBuilding) return;
            
            document.getElementById('detail-building-name').textContent = currentBuilding.name;
            document.getElementById('detail-address').textContent = currentBuilding.address;
            document.getElementById('detail-db').textContent = `${currentBuilding.dbServer} • Port 1433`;
            document.getElementById('detail-door-count').textContent = currentBuilding.doorCount;
            
            const tbody = document.getElementById('doors-table-body');
            tbody.innerHTML = currentBuilding.doors.map(door => `
                <tr class="hover:bg-gray-900/50 transition-colors group">
                    <td class="p-4 font-mono text-xs text-primary-400">${door.id}</td>
                    <td class="p-4 text-white">${door.location}</td>
                    <td class="p-4">
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${door.status === 'locked' ? 'bg-success-500/10 text-success-400 border border-success-500/20' : 'bg-warning-500/10 text-warning-400 border border-warning-500/20'}">
                            <span class="w-1.5 h-1.5 rounded-full ${door.status === 'locked' ? 'bg-success-500' : 'bg-warning-500'}"></span>
                            ${door.status === 'locked' ? 'Locked' : 'Unlocked'}
                        </span>
                    </td>
                    <td class="p-4 text-gray-300 text-xs uppercase">${door.mode.replace('_', '+')}</td>
                    <td class="p-4 text-gray-500 text-xs">${door.lastActivity}</td>
                    <td class="p-4 text-right">
                        <button onclick="editDoor('${door.id}')" class="text-gray-400 hover:text-primary-400 transition-colors p-2 hover:bg-primary-500/10 rounded-lg">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
        }

        // Door Edit Modal
        function editDoor(doorId) {
            const door = currentBuilding.doors.find(d => d.id === doorId);
            document.getElementById('modal-door-id').value = doorId;
            document.getElementById('modal-location').value = door.location;
            document.getElementById('modal-access').value = door.mode;
            document.getElementById('door-modal').showModal();
        }

        function closeModal() {
            document.getElementById('door-modal').close();
        }

        function saveDoorChanges() {
            closeModal();
            createEvent(currentBuilding.id, 'DOOR_CONFIG_UPDATE', `Door ${document.getElementById('modal-door-id').value} updated`);
            showToast('Changes saved & sync initiated', 'success');
        }

        // Events / Outbox
        function createEvent(buildingId, operation, description) {
            const event = {
                id: `evt-${eventIdCounter++}`,
                buildingId,
                operation,
                table: 'Doors',
                status: 'pending',
                retries: 0,
                timestamp: new Date().toLocaleTimeString(),
                description
            };
            pendingEvents.unshift(event);
            updatePendingCount();
            
            // Simulate processing
            setTimeout(() => {
                event.status = 'processing';
                addLog(`BuildingSyncWorker-${String(buildingId).padStart(2, '0')}`, `Processing event ${event.id} (${operation})`);
                
                setTimeout(() => {
                    event.status = Math.random() > 0.9 ? 'failed' : 'completed';
                    if(event.status === 'failed') event.retries++;
                    updatePendingCount();
                    addLog(`BuildingSyncWorker-${String(buildingId).padStart(2, '0')}`, `Event ${event.id} ${event.status}`);
                }, 1500);
            }, 500);
        }

        function updatePendingCount() {
            const count = pendingEvents.filter(e => e.status === 'pending').length;
            document.getElementById('pending-count').textContent = count;
            document.getElementById('stat-pending').textContent = count;
        }

        function renderEvents() {
            const tbody = document.getElementById('events-table-body');
            tbody.innerHTML = pendingEvents.slice(0, 20).map(evt => {
                const statusColors = {
                    pending: 'bg-warning-500/10 text-warning-400 border-warning-500/20',
                    processing: 'bg-primary-500/10 text-primary-400 border-primary-500/20 animate-pulse',
                    completed: 'bg-success-500/10 text-success-400 border-success-500/20',
                    failed: 'bg-danger-500/10 text-danger-400 border-danger-500/20'
                };
                
                return `
                    <tr class="border-b border-gray-800/50 hover:bg-gray-900/30 transition-colors">
                        <td class="p-4 font-mono text-xs text-gray-500">${evt.id}</td>
                        <td class="p-4 text-white">Building ${String.fromCharCode(64 + evt.buildingId)}</td>
                        <td class="p-4">
                            <span class="font-mono text-xs ${evt.operation.includes('UPDATE') ? 'text-primary-400' : evt.operation.includes('DELETE') ? 'text-danger-400' : 'text-success-400'}">
                                ${evt.operation}
                            </span>
                        </td>
                        <td class="p-4 text-gray-400 text-xs">${evt.table}</td>
                        <td class="p-4">
                            <span class="px-2 py-1 rounded-full text-xs border ${statusColors[evt.status]}">${evt.status}</span>
                        </td>
                        <td class="p-4 text-gray-500 text-xs">${evt.retries}/3</td>
                        <td class="p-4 text-gray-500 text-xs font-mono">${evt.timestamp}</td>
                        <td class="p-4 text-right">
                            ${evt.status === 'failed' ? '<button class="text-primary-400 hover:text-primary-300 text-xs">Retry</button>' : '<span class="text-gray-600 text-xs">-</span>'}
                        </td>
                    </tr>
                `;
            }).join('');
        }

        // Logs
        function addLog(source, message) {
            const container = document.getElementById('log-entries');
            const time = new Date().toLocaleTimeString();
            const entry = document.createElement('div');
            entry.className = 'flex gap-3 text-gray-400 animate-fade-in';
            entry.innerHTML = `
                <span class="text-gray-600">[${time}]</span>
                <span class="text-primary-400">INFO</span>
                <span class="text-gray-500 w-32">${source}</span>
                <span class="text-gray-300">→ ${message}</span>
            `;
            container.insertBefore(entry, container.firstChild);
        }

        // Simulation
        function startSimulation() {
            // Random sync updates
            setInterval(() => {
                buildings.forEach(b => {
                    if(Math.random() > 0.95) {
                        b.lastSync = 0;
                        b.status = 'syncing';
                        setTimeout(() => {
                            b.status = 'online';
                            b.latency = 100 + Math.floor(Math.random() * 100);
                            renderBuildings();
                        }, 2000);
                    } else {
                        b.lastSync++;
                    }
                });
                renderBuildings();
            }, 3000);

            // Random events
            setInterval(() => {
                if(Math.random() > 0.7) {
                    const bId = Math.floor(Math.random() * 18) + 1;
                    const ops = ['DOOR_ACCESS_UPDATE', 'SCHEDULE_CHANGE', 'CARD_PROVISION', 'CONFIG_UPDATE'];
                    createEvent(bId, ops[Math.floor(Math.random() * ops.length)], 'Auto-generated');
                }
            }, 4000);

            // Update stats
            setInterval(() => {
                document.getElementById('stat-latency').innerHTML = `${120 + Math.floor(Math.random() * 50)}<span class="text-lg text-gray-500 ml-1">ms</span>`;
                document.getElementById('event-rate').textContent = 20 + Math.floor(Math.random() * 10);
            }, 2000);
        }

        function simulateFailure() {
            const targetId = Math.floor(Math.random() * 18) + 1;
            buildings.find(b => b.id === targetId).status = 'error';
            renderBuildings();
            showToast(`Building ${String.fromCharCode(64 + targetId)} connection failed`, 'error');
        }

        function forceFullResync() {
            showToast('Full resync initiated for ' + currentBuilding.name, 'info');
            document.getElementById('detail-last-sync').textContent = 'Syncing...';
            setTimeout(() => {
                document.getElementById('detail-last-sync').textContent = 'Just now';
                showToast('Resync completed successfully', 'success');
            }, 3000);
        }

        function refreshAllBuildings() {
            showToast('Refreshing all building statuses...', 'info');
            setTimeout(() => renderBuildings(), 1000);
        }

        // Toast notifications
        function showToast(message, type = 'info') {
            const colors = {
                success: 'border-success-500/30 bg-success-500/10 text-success-400',
                error: 'border-danger-500/30 bg-danger-500/10 text-danger-400',
                info: 'border-primary-500/30 bg-primary-500/10 text-primary-400'
            };
            
            const container = document.getElementById('toast-container');
        // Close modal on backdrop click
        document.getElementById('door-modal').addEventListener('click', (e) => {
            if(e.target === document.getElementById('door-modal')) closeModal();
        });
    </script>
