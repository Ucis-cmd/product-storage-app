# Products Database Setup Guide

![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue)
![GitHub](https://img.shields.io/badge/GitHub-Repository-lightgrey)

This guide explains how to set up the `products` database using the provided SQL dump file.

## Prerequisites

- MySQL Server 8.0 or higher
- MySQL Workbench (optional, for GUI method)
- Command line terminal

## Quick Start

```bash
# Clone repository (if applicable)
git clone https://github.com/yourusername/your-repo.git
cd your-repo

# Import database (using command line)
mysql -u root -p products < products_dump.sql
