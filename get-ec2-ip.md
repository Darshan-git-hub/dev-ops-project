# How to Get Your EC2 Instance IP Address

Since Terraform state is managed by GitHub Actions, here are ways to get your EC2 IP:

## Option 1: Check GitHub Actions Output

1. Go to: https://github.com/Darshan-git-hub/dev-ops-project/actions
2. Click on the latest successful workflow run
3. Expand the "Update EC2 Instance (Redeploy)" step
4. Look for the line: "Application deployed at: http://X.X.X.X"

## Option 2: AWS Console

1. Go to AWS Console: https://console.aws.amazon.com/ec2
2. Select region: **ap-south-1 (Mumbai)**
3. Click "Instances" in the left sidebar
4. Find instance named: **gamezone-server**
5. Copy the "Public IPv4 address"

## Option 3: Install AWS CLI and Run Command

```bash
# Install AWS CLI first
# Then run:
aws ec2 describe-instances \
  --filters "Name=tag:Name,Values=gamezone-server" "Name=instance-state-name,Values=running" \
  --query "Reservations[0].Instances[0].PublicIpAddress" \
  --output text \
  --region ap-south-1
```

## Option 4: Add Output to GitHub Actions

I can update the workflow to display the IP more prominently in the logs.

---

**Easiest: Check the GitHub Actions logs or AWS Console!**
