[CmdletBinding()]
param (
	[Parameter(Mandatory)]
	[string]
	$AuthorizationLg,
	[System.Uri]
	$Proxy
)

chcp 65001

$BaseUrl = "http://yjpf.gsosc.cn";
[System.Uri]$Url = "http://yjpf.gsosc.cn/prod-api/app/bzCeShi/saveJJLUserAnswer";

if ($AuthorizationLg -notlike "Bearer *") {
	$AuthorizationLg = "Bearer $($AuthorizationLg)";
}

$Headers = @{
	"Accept"          = "application/json, text/plain, */*";
	"Content-Type"    = "application/json; charset=UTF-8";
	"Referer"         = "http://www.gsosc.cn/yj/home?projectId=emd2021";
	"Accept-Encoding" = "gzip, deflate";
	"AuthorizationLg" = $AuthorizationLg;
	'Accept-Language' = "zh-CN, zh; q=0.9, en-US; q=0.8, en; q=0.7";
	#"Connection"      = "close";
	"Origin"          = "http://www.gsosc.cn";
}

$Body = @{
	"projectId" = "emd2021";
	"json"      = "";
	"dtId"      = "emd2021_jlldt";
}

$Json = @{
	"answer" = "7701cee40fed4c6ab161a3bf4485a97e#B#654487##569852b6ebf3434a95e27d9040d087d7#ABC#59491##d229308b40014e49b9d7a74042094cf8#A#27687##4b3876028c9b44f9ac5a5abf45f818f1#B#18832##973dfb3266a6492c8b372f26ac77902e#A#25928##";
	"time"   = 768073
};

#$Param = @{Uri = $Url; Method = "POST"; Headers = $Headers; 'AllowUnencryptedAuthentication' = $True; };
$Param = @{Uri = $Url; Method = "POST"; Headers = $Headers; };
#$Param['Authentication'] = 'Bearer'
#$Param['Token'] = (ConvertTo-SecureString -String $($AuthorizationLg -replace "Bearer ", "") -AsPlainText)
if ($null -ne $Proxy) {
	$Param['Proxy'] = $Proxy;
}

function Invoke-Request {
	param (
		[System.Object]$CurlParameter = $null
	)
	$CurlParameter['UserAgent'] = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36 QBCore/4.0.1326.400 QQBrowser/9.0.2524.400 Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2875.116 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63010200)";
	$_Res = Invoke-WebRequest @CurlParameter ;
	$_Res = $($_Res.Content | ConvertFrom-Json);
	if ($_Res.Code -ne 200) {
		Write-Error $_Res;
		Write-Error $_Res.msg;
		#exit;
		return $null;
	}
	return $_Res;
}

function NoSense {
	[System.Uri]$_Url = "$($BaseUrl -replace "yjpf","www")/prod-api/app/project/zyaction";
	$_Param = @{Uri = $_Url; Method = "POST"; Headers = $Headers; 'AllowUnencryptedAuthentication' = $True; };
	if ($null -ne $Proxy) {
		$_Param['Proxy'] = $Proxy;
	}
	$_Param['Body'] = $(@{
			"projectId" = "emd2021";
			"pageName"  = "emd2021_home";
			"stayTime"  = 1;
			"type"      = "1"
		} | ConvertTo-Json);
	Invoke-Request $_Param;
	$_Url = "$($BaseUrl -replace "yjpf","www")/prod-api/app/project/zybrowser";
	$_Param.Uri = $_Url;
	$_Param['Body'] = $(@{"projectId" = "emd2021"; "type" = 0 } | ConvertTo-Json);
	Invoke-Request $_Param;
	$_Url = "$($BaseUrl -replace "yjpf","www")/prod-api/modMainWx/wChatConfig";
	$_Param.Uri = $_Url;
	$_Param['Body'] = $(@{"url" = "http://www.gsosc.cn/yj/home?projectId=emd2021"; "projectId" = "emd2021" } | ConvertTo-Json);
	Invoke-Request $_Param;
}

$Body.json = (echo $Json | ConvertTo-Json) -replace "\r\n", ""

function Invoke-QianDao {
	$Url = "$($BaseUrl)/prod-api/app/qiandao/add";
	$Param.Uri = $Url;
	$Param.Headers.Referer = "http://www.gsosc.cn/yj/answershizhan?projectId=emd2021";
	$Param['Body'] = $(@{
			"projectId" = "emd2021";
			"mesId"     = "qiandao023";
			"answer"    = 2;
		} | ConvertTo-Json);
	Invoke-Request $Param;
	if ($null -ne $Res) {
		Write-Host "Checked in"
	}
}

function Invoke-LianXi {
	param (
		[int]$Times = 5
	)
	$Url = "$($BaseUrl)/prod-api/app/bzCeShi/saveJJLUserAnswer";
	$Param.Uri = $Url;
	$Param.Headers.Referer = "http://www.gsosc.cn/yj/answer?projectId=emd2021&cpId=";
	$Body.dtId = "emd2021_jlldt";
	$Json = @{
		"answer" = "7701cee40fed4c6ab161a3bf4485a97e#B#654487##569852b6ebf3434a95e27d9040d087d7#ABC#59491##d229308b40014e49b9d7a74042094cf8#A#27687##4b3876028c9b44f9ac5a5abf45f818f1#B#18832##973dfb3266a6492c8b372f26ac77902e#A#25928##";
		"time"   = 768073
	}
	for ($i = 1; $i -le $Times; $i++ ) {
		$Body.json = (Write-Output $Json | ConvertTo-Json) -replace "\r\n", "";
		$Param["Body"] = (Write-Output $Body | ConvertTo-Json);

		$Res = Invoke-Request $Param
		if ($null -ne $Res) {
			Write-Output $Res.msg
			Write-Output "$($Res.data.answer.rightTi) questions were answered";
		}
		Write-Output "Wait a minute...";
		Start-Sleep -Seconds $(Get-Random -Minimum 40 -Maximum 80);
	}

}

function Invoke-DaTi {
	param (
		[int]$Times = 3
	)
	$Url = "$($BaseUrl)/prod-api/app/bzCeShi/saveSZYUserAnswer";
	$Param.Uri = $Url;
	$Param.Headers.Referer = "http://www.gsosc.cn/yj/answershizhan?projectId=emd2021";
	$Body.dtId = "emd2021_szydt";
	$Json = @{
		"answer" = "76a50b360a90451088ab982c77053644#B#4509##02cbe782c7f544bc947b393ac6299fb4#A#6466##9a82ed3c9f364f2581eefead33aba0ad#A#40730##c9ef4d16358a44fb85738d8f702cec64#A#3645##99f6e1f2fc40416aacd4fa998088854a#B#6008##";
		"time"   = 180000
	}
	$Body.json = (echo $Json | ConvertTo-Json) -replace "\r\n", "";
	$Param["Body"] = (echo $Body | ConvertTo-Json);
	$Answer = $Json.answer -split "##";

	for ($i = 1 ; $i -le $Times; $i ++) {
		$LuckyNum = Get-Random -Minimum 0 -Maximum $($Answer.Count - 1);
		$RandNum = Get-Random -Minimum 1000 -Maximum 9999;
		if (($Answer[$LuckyNum] -split "#")[2] -eq $RandNum) {
			$RandNum = $RandNum + 1;
		}
		$Answer[$LuckyNum] = $($Answer[$LuckyNum] -replace "(.*)#\d*$", $('$1#' + $RandNum));
		$Json.time = $Json.time - 10000 * $LuckyNum;
		$Json.answer = $Answer -join "##";
		$Body.json = (echo $Json | ConvertTo-Json) -replace "\r\n", "";
		$Param["Body"] = (echo $Body | ConvertTo-Json);

		$Res = Invoke-Request $Param
		if ($null -ne $Res) {
			Write-Output $Res.msg
			Write-Output "$($Res.data.answer.rightTi) questions were answered";
		}
		Write-Output "Wait a minute...";

		Start-Sleep -Seconds $(Get-Random -Minimum 40 -Maximum 80);
	}
}

#NoSense
#Start-Sleep -Seconds 5
#Write-Output "等待5s..."

Invoke-QianDao
Write-Output "Do exam after 10 seconds..."
Start-Sleep -Seconds 10

Invoke-DaTi -Times 3
Write-Output "Do exercise after 3 seconds..."
Start-Sleep -Seconds 3

Invoke-LianXi -Times 5
Write-Output "End.";
