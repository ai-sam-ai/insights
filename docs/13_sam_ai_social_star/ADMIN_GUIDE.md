# SAM AI Social Star - Administrator Guide

## Overview

This guide covers installation, configuration, and maintenance of SAM AI Social Star for Odoo administrators.

---

## Installation

### Prerequisites

- Odoo 18.0 (Community or Enterprise)
- Python 3.10+
- PostgreSQL 14+
- 8GB+ RAM recommended
- GPU with 8GB+ VRAM (for video generation)

### Required Python Packages

```bash
pip install anthropic          # Claude API
pip install elevenlabs         # ElevenLabs TTS
pip install TTS                # Coqui TTS
pip install torch torchaudio   # PyTorch for AI models
pip install moviepy            # Video processing
pip install Pillow             # Image processing
pip install pydub              # Audio processing
pip install google-api-python-client  # YouTube API
pip install google-auth-oauthlib      # Google OAuth
pip install requests           # HTTP requests
pip install aiohttp            # Async HTTP
```

### Module Installation

1. Copy `samai_social_star` to your Odoo addons path
2. Update the apps list: `Settings > Apps > Update Apps List`
3. Search for "SAM AI Social Star"
4. Click **Install**

---

## System Parameters Configuration

All configuration is stored in Odoo System Parameters (`Settings > Technical > Parameters > System Parameters`).

### Core API Keys

| Parameter | Description | Required |
|-----------|-------------|----------|
| `samai_social_star.claude_api_key` | Anthropic Claude API key | Yes |
| `samai_social_star.elevenlabs_api_key` | ElevenLabs API key | Optional |

**Setting Claude API Key:**
```
Key: samai_social_star.claude_api_key
Value: sk-ant-api03-xxxxxxxxxxxxx
```

**Setting ElevenLabs API Key:**
```
Key: samai_social_star.elevenlabs_api_key
Value: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Platform Credentials

#### YouTube

| Parameter | Description |
|-----------|-------------|
| `samai_social_star.youtube_client_id` | OAuth 2.0 Client ID |
| `samai_social_star.youtube_client_secret` | OAuth 2.0 Client Secret |
| `samai_social_star.youtube_refresh_token` | OAuth Refresh Token |

**Setup Steps:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project or select existing
3. Enable YouTube Data API v3
4. Create OAuth 2.0 credentials (Web application)
5. Set redirect URI to your Odoo URL
6. Run OAuth flow to get refresh token

#### LinkedIn

| Parameter | Description |
|-----------|-------------|
| `samai_social_star.linkedin_client_id` | OAuth 2.0 Client ID |
| `samai_social_star.linkedin_client_secret` | OAuth 2.0 Client Secret |
| `samai_social_star.linkedin_access_token` | Access Token |

**Setup Steps:**
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create an app
3. Request access to `w_member_social` and `rw_organization_admin`
4. Complete OAuth flow

#### TikTok

| Parameter | Description |
|-----------|-------------|
| `samai_social_star.tiktok_client_key` | App Client Key |
| `samai_social_star.tiktok_client_secret` | App Client Secret |
| `samai_social_star.tiktok_access_token` | Access Token |

**Setup Steps:**
1. Go to [TikTok for Developers](https://developers.tiktok.com/)
2. Create an app
3. Request Video Publishing permissions (requires approval)
4. Complete OAuth flow

#### Instagram (via Facebook)

| Parameter | Description |
|-----------|-------------|
| `samai_social_star.instagram_access_token` | Facebook Graph API Token |
| `samai_social_star.instagram_business_id` | Instagram Business Account ID |

**Setup Steps:**
1. Set up Facebook Business account
2. Connect Instagram Business account
3. Create Facebook App with Instagram Graph API access
4. Generate long-lived access token

#### Twitter/X

| Parameter | Description |
|-----------|-------------|
| `samai_social_star.twitter_api_key` | API Key |
| `samai_social_star.twitter_api_secret` | API Secret |
| `samai_social_star.twitter_access_token` | Access Token |
| `samai_social_star.twitter_access_secret` | Access Token Secret |

**Setup Steps:**
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a project and app
3. Generate API keys and Access tokens
4. Ensure app has write permissions

#### Facebook

| Parameter | Description |
|-----------|-------------|
| `samai_social_star.facebook_access_token` | Page Access Token |
| `samai_social_star.facebook_page_id` | Facebook Page ID |

**Setup Steps:**
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create an app
3. Add Facebook Login product
4. Generate Page Access Token with `pages_manage_posts` permission

---

## Storage Configuration

### File Storage Paths

| Parameter | Description | Default |
|-----------|-------------|---------|
| `samai_social_star.storage_path` | Base storage path | `/var/lib/odoo/social_star` |
| `samai_social_star.audio_path` | Audio files | `{storage_path}/audio` |
| `samai_social_star.video_path` | Video files | `{storage_path}/video` |
| `samai_social_star.temp_path` | Temporary files | `{storage_path}/temp` |

**Example Configuration:**
```
Key: samai_social_star.storage_path
Value: /data/social_star
```

### Storage Permissions

Ensure the Odoo service user has write permissions:

```bash
sudo mkdir -p /var/lib/odoo/social_star/{audio,video,temp}
sudo chown -R odoo:odoo /var/lib/odoo/social_star
sudo chmod -R 755 /var/lib/odoo/social_star
```

---

## GPU Configuration

### CUDA Setup

Ensure CUDA is properly installed for GPU acceleration:

```bash
# Check CUDA availability
python -c "import torch; print(torch.cuda.is_available())"

# Check GPU info
nvidia-smi
```

### GPU Memory Settings

| Parameter | Description | Default |
|-----------|-------------|---------|
| `samai_social_star.gpu_memory_limit` | Max GPU memory (GB) | `0` (auto) |
| `samai_social_star.gpu_device` | GPU device ID | `0` |
| `samai_social_star.enable_gpu` | Enable GPU processing | `True` |

**For multi-GPU systems:**
```
Key: samai_social_star.gpu_device
Value: 0  # Use first GPU
```

**To limit memory:**
```
Key: samai_social_star.gpu_memory_limit
Value: 6  # Limit to 6GB
```

---

## Performance Tuning

### Cache Settings

| Parameter | Description | Default |
|-----------|-------------|---------|
| `samai_social_star.cache_ttl` | Cache TTL in seconds | `3600` |
| `samai_social_star.cache_max_size` | Max cache entries | `100` |
| `samai_social_star.disk_cache_path` | Disk cache path | `{storage_path}/cache` |
| `samai_social_star.disk_cache_max_size` | Max disk cache (GB) | `10` |

### Worker Settings

| Parameter | Description | Default |
|-----------|-------------|---------|
| `samai_social_star.max_workers` | Max concurrent workers | `2` |
| `samai_social_star.batch_size` | Default batch size | `5` |
| `samai_social_star.queue_timeout` | Queue timeout (seconds) | `3600` |

### Rate Limiting

| Parameter | Description | Default |
|-----------|-------------|---------|
| `samai_social_star.rate_limit_enabled` | Enable rate limiting | `True` |
| `samai_social_star.rate_limit_buffer` | Safety buffer percentage | `20` |

---

## Security Configuration

### API Key Encryption

For production environments, consider encrypting API keys:

| Parameter | Description |
|-----------|-------------|
| `samai_social_star.encrypt_credentials` | Enable encryption |
| `samai_social_star.encryption_key` | Encryption key (Fernet) |

**Generate encryption key:**
```python
from cryptography.fernet import Fernet
key = Fernet.generate_key()
print(key.decode())
```

### Access Control

Configure user groups for access control:

| Group | Description | Access Level |
|-------|-------------|--------------|
| `samai_social_star.group_user` | Basic users | Create/Edit campaigns |
| `samai_social_star.group_manager` | Managers | Publish + manage all |
| `samai_social_star.group_admin` | Administrators | Full configuration |

---

## Scheduled Actions

### Automatic Pipeline Processing

The module includes scheduled actions for background processing:

| Action | Default Schedule | Description |
|--------|-----------------|-------------|
| `Process Pending Pipelines` | Every 5 minutes | Process queued campaigns |
| `Cleanup Temporary Files` | Daily at 2:00 AM | Remove old temp files |
| `Refresh OAuth Tokens` | Daily at 3:00 AM | Refresh platform tokens |

**Configure via:** `Settings > Technical > Automation > Scheduled Actions`

### Cron Job Configuration

```xml
<!-- Example: Change pipeline processing frequency -->
<record id="ir_cron_process_pipelines" model="ir.cron">
    <field name="name">Social Star: Process Pending Pipelines</field>
    <field name="model_id" ref="model_social_star_campaign"/>
    <field name="state">code</field>
    <field name="code">model.process_pending_pipelines()</field>
    <field name="interval_number">5</field>
    <field name="interval_type">minutes</field>
    <field name="active">True</field>
</record>
```

---

## Logging Configuration

### Log Levels

Configure logging in Odoo config file:

```ini
[options]
log_handler = :INFO,samai_social_star:DEBUG
log_level = info
```

### Specific Module Logging

```ini
# Enable detailed logging for specific components
log_handler = samai_social_star.node_video:DEBUG
log_handler = samai_social_star.node_publish:DEBUG
```

### Log File Location

```ini
logfile = /var/log/odoo/odoo.log
log_rotate = True
log_rotate_keep = 30
```

---

## Backup and Recovery

### What to Backup

1. **Database**: Contains all campaign data, settings, metadata
2. **File Storage**: Audio, video files in storage path
3. **System Parameters**: API keys and credentials

### Backup Script Example

```bash
#!/bin/bash
# backup_social_star.sh

DATE=$(date +%Y%m%d)
BACKUP_DIR="/backup/social_star"

# Backup database
pg_dump -U odoo odoo_db > $BACKUP_DIR/db_$DATE.sql

# Backup file storage
tar -czf $BACKUP_DIR/files_$DATE.tar.gz /var/lib/odoo/social_star

# Backup system parameters (export from Odoo)
echo "Remember to export System Parameters from Odoo UI"
```

### Recovery Steps

1. Restore database: `psql -U odoo odoo_db < db_backup.sql`
2. Restore files: `tar -xzf files_backup.tar.gz -C /`
3. Verify system parameters are intact
4. Restart Odoo service

---

## Monitoring

### Health Check Endpoints

The module provides status checking via Python:

```python
# In Odoo shell
from odoo.addons.samai_social_star.utils import get_platform_rate_limiter

# Check rate limiter status
limiter = get_platform_rate_limiter()
print(limiter.get_status())

# Check GPU status
from odoo.addons.samai_social_star.utils import GPUManager
gpu = GPUManager()
print(gpu.get_gpu_status())
```

### Key Metrics to Monitor

| Metric | Warning Threshold | Critical Threshold |
|--------|-------------------|-------------------|
| GPU Memory Usage | 80% | 95% |
| Disk Space (storage) | 80% | 95% |
| Failed Campaigns/Hour | 5 | 20 |
| Queue Length | 50 | 200 |

---

## Troubleshooting

### Common Issues

**Issue: "Claude API key not configured"**
- Verify `samai_social_star.claude_api_key` exists in System Parameters
- Check key format (should start with `sk-ant-`)

**Issue: "GPU out of memory"**
- Lower quality settings in avatar configuration
- Reduce batch size
- Enable GPU memory cleanup between jobs

**Issue: "Platform authentication failed"**
- Refresh OAuth tokens
- Verify credentials are still valid
- Check API rate limits on platform side

**Issue: "Video generation extremely slow"**
- Verify GPU is being used: check logs for "Using GPU" message
- Check CUDA installation
- Reduce video resolution/quality

### Debug Mode

Enable debug mode for detailed logging:

```
Key: samai_social_star.debug_mode
Value: True
```

This enables:
- Detailed API request/response logging
- GPU memory usage at each step
- Pipeline stage timing
- File operation logging

---

## Upgrading

### Before Upgrading

1. Backup database and files
2. Note current system parameter values
3. Check release notes for breaking changes

### Upgrade Steps

1. Stop Odoo service
2. Replace module files
3. Start Odoo service
4. Update module: `Settings > Apps > Social Star > Upgrade`
5. Verify configuration

### Post-Upgrade Checks

- [ ] All system parameters intact
- [ ] Test campaign creation
- [ ] Test video generation
- [ ] Test publishing to each platform
- [ ] Verify scheduled actions are running

---

## Support

- **Documentation**: Check `doc/` folder in module
- **Issues**: Report via GitHub
- **Email**: support@sme.ec

---

*SAM AI Social Star v18.0.1.0.0 - Administrator Guide*
