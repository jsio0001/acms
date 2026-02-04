# DoorSync Unified Access Control System

A modern, real-time access control management dashboard built with HTML, Tailwind CSS, and JavaScript.

## Overview

DoorSync Unified provides centralized management of access control systems across multiple buildings. The system features real-time synchronization of access events across 18 SQL Server instances using an outbox pattern with PostgreSQL as the source of truth.

## Features

- **Real-time Dashboard**: Monitor the status of 246 doors across 18 buildings
- **Event Synchronization**: Asynchronous replication using outbox pattern
- **System Health Monitoring**: Track uptime, latency, and system health metrics
- **Multi-building Management**: Filter and manage building zones efficiently
- **Access Card Management**: Manage user access permissions
- **System Logging**: Comprehensive event logging and monitoring

## Architecture

- **Frontend**: HTML, CSS (Tailwind), JavaScript
- **Styling**: Tailwind CSS with custom configurations
- **Database**: PostgreSQL (primary) with 18 SQL Server instances
- **Synchronization**: Outbox pattern for reliable event replication
- **UI Framework**: Custom dashboard with responsive design

## Key Components

- **Dashboard View**: Overview of system metrics and building status
- **Sync Events View**: Real-time event stream visualization
- **Access Cards View**: User access card management
- **System Logs View**: Comprehensive logging interface

## Design Elements

- Dark mode UI with glassmorphism effects
- Responsive layout for various screen sizes
- Animated transitions and visual feedback
- Status indicators with color-coded alerts
- Building cards with hover effects

## Technologies Used

- Tailwind CSS for styling
- Font Awesome for icons
- Google Fonts (Inter, Fira Code)
- Client-side JavaScript for interactivity

## Installation

No installation required - this is a standalone HTML application. Simply open `index.html` in a modern web browser.

## Usage

1. Open `index.html` in a web browser
2. Use the sidebar navigation to switch between views
3. Monitor system metrics and building statuses
4. Use filtering options to manage specific building zones
5. Check sync events and system logs as needed

## Screenshots

The application includes a comprehensive dashboard showing:
- Total doors across buildings
- Real-time sync status
- Pending events queue
- Average system latency
- Building zone management

## License

This project is available for educational purposes and demonstration of access control system architecture patterns.